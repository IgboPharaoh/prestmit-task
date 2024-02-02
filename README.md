
### Introduction

I'm Joost Jaeger, I work for Lightning Labs.
At Lightning Labs I'm a software engineer and my main focus is on LND.
And over the last month I spent quite some time to improve pathfinding in LND and in this talk I would like to explain how we optimize pathfinding for the reliability of paths.


### What to optimize a path for

So we're looking for a path, that's clear, but what do we optimize the path for?
There are many ways that you can optimize a path for.
And in all the releases of LND, so this is like pre-07, we would mainly optimize for cost.
There's another small factor for time lock, but I will leave it out now.
It's mainly only cost.
So if you would have two routes, depicted on the right there, so there would be like a clean highway straight to your destination, but there were some like toll paying gates in front of them, and there was another route which was free, but it doesn't look to be very fast.
We would always go for the route on the right.
And if this route failed, because it was cheaper that failed, we started to look for a route that is slightly more expensive, but we didn't really care whether it was reliable or not.
We would only go to the highway when we had no other choice at all.

After 07, we realized that this is not enough, because users don't necessarily want this.
They don't really want to have the cheapest route always.
They are willing to pay a slightly higher fee in order for their payment to succeed first time or maybe within a limited amount of attempts.
What could even happen with choosing a reliable route is that you need so many attempts, you end up in parts of the network where there is no exit really, so you keep on trying and at some time you just give up.
Basically you are prevented from making the payment.
So we recognized that we needed to add another factor to this.
Cost should remain important, but it shouldn't be the only thing.
Sometimes we want to go for the highway.


### Payment attempt cost

So how do we control this?
Because what we need to do is we need to make a trade-off between the cost on the one hand and the reliability on the other hand.
In order to do so, we defined a new parameter in LND which is called the ***payment attempt cost***.
And the payment attempt cost, this is a virtual cost, because in Lightning you don't pay for a payment attempt.
You can do as many payment attempts as you want.
It doesn't really matter how many of them fail, it's all for free.
The failed payment attempts are free.
And this is also what people use for example to probe the network to find out like what people's balances are or figure out the connectivity of nodes.
And what we do here is that we define a virtual cost for a single payment attempt.
So we assume, we act as if there would be a cost that you need to pay for a payment attempt.
And as a user, you can set this cost.


***payment attempt cost***

Parameter that controls the time vs money trade-off:
- Virtual cost of a single "payment attempt"
- Configurable through **--routerrpc.attemptcost=...** (default: 100 sat)
- **pathfinding_cost = routing_fee + attempt_cost / success_probability** (details)


So there is a command line parameter shown on the slide and the default is 100 sats.
So by default, we assume that a user is willing to pay 100 sats for a payment attempt.
And this translates into a new factor that we use in pathfinding.
So if you look at the formula on the slide, there is the pathfinding cost.
It's comprised of the routing fee and on top of that we add a penalty that expresses the reliability of the route.
So it's the attempt cost that you set as a user divided by the probability.
So when either the attempt cost goes, I have to say it in the right way.
Let's just do the example, it makes it easier.
So in the table below, there's like two routes, route A and route B.


| Route | Routing fee | Success Probability | Path finding cost @ 120 sat/attempt | Path finding cost @ 360 sat/attempt fee | 
| :----------- | :----------- | :----------- | :----------- | :----------- | 
| A | 200 sats | 80% | 350 | 650(best) |
| B | 100 sats | 60% | 300(best) | 700 |


Route A has a 200 sat fee, route B only has a 100 sat fee.
Pre-LND07, we would just go for route B, no further questions asked because this is the cheapest route.
Route B has the lowest success probability.
It's only 60% while route A has an 80% success probability.
And if you calculate the new pathfinding cost that accommodates for the reliability, you see it in the second last column, with a payment attempt cost like a virtual attempt cost of 120 satoshi per attempt, you will see that those pathfinding costs, they go up, but still route B is the best route with this payment attempt cost.
So we recognize that the route is slightly less reliable than A, but because we don't think a payment attempt is worth much, we still go for route B.
However, if we increase the payment attempt cost to 360, so basically we're saying like we are willing to pay more for a payment attempt that is not needed, then you will see that the cost of route B is going to exceed the cost of route A, and we will pick route A.
So by tuning this parameter, you can actually express your preference for low fee routes versus reliable routes.
I'm not sure how many people are aware of this, but this is a parameter that currently exists, and you can play with this.

So then on to how do we estimate route success probabilities?


### Estimate route success probabilities

Because as I explained in a previous slide, this is an input for a pathfinding algorithm, and we need to estimate the probability of a successful traverse of a route.
And the way we do this is that we simplify the problem by first estimating the success probabilities of the individual channels.

So suppose in this route, there's route ABC, the channel AB has a 70% success probability, BC has a 30% success probability, and it's actually quite simple.
In order for a route to be successful, all of its channels need to be successful.
And using basic probability mathematics, you should multiply those probabilities.
So similar to if you flip a coin and you want two heads, it's like 50% times 50%.
The chance of getting two heads is 25%, and we do the same for a route.
So 0.7 times 0.3 is 21%.


**P(ABC) = P(AB) * P(BC) = 0.7 * 0.3 = 21%**


So for this route, the success probability is 21%, and this reduces our problem of estimating route success probabilities to the estimation of channel success probabilities.

So then before I go into how do we get to channel success probabilities, I want to go into the special case, the special case where we have no info.


#### Special case: no info

Because this is also what happens to us, especially to users that are new to the Lightning Network.
They know very little about the existing channels on the network.
And they still need to decide which route they take.
This is called in the general context the exploit versus explore dilemma.

You also encounter this in real life, probably in Berlin.
If you go to a restaurant, and you have a restaurant where you already went yesterday, the food was good, you know what the prices are, you can either decide to go there again today, or you go to a different restaurant where you know the prices are lower, but you don't really know what the quality is.
So going to the same restaurant again is exploit, and going to a new one is explore.
If you always go to the same, you run the risk that you never discover any better places.
If you always keep exploring, you're probably not exploiting the things that you've learned, and overall you will be not as good off as when you would also exploit the knowledge that you have.

And the same thing happens for routes in Lightning.
So there's two routes here, both of them have two hops.


| Route | Hops | Routing fee | Success Probability |
| :----------- | :----------- | :----------- | :----------- | 
| A | 2 | 500 sats | 95% |
| B | 2 | 300 sats | unknown |


For route A, we know the success probability, 95%, really good.
And then route B, it's cheaper, but we never tried it before.
So what are we going to do?
Are we going to try route B, or do we stick with route A?

The way we tackle this is that we introduce the a priori probability.
This is a constant in Lightning.
It's not really a constant, you can configure it, but once you configure it, it's constant.
And this is the assumed success probability of a channel that you never tried before.
The default of this is 60%.


***What is the success probability of a route that we know nothing about ?**
- Constant value per channel, reflecting the current state of the network
- Configurable through **--routerrpc.apriorihopprob = ...** (default: 60%)


| Route | Hops | Routing fee | Success Probability |
| :----------- | :----------- | :----------- | :----------- | 
| A | 2 | 500 sats | 95% |
| B | 2 | 300 sats | 60% * 60% = 36% |


So what it means is that we assume for any channel that you try, suppose you just pick a random channel in the graph, that its success probability is 60%.
And if you know it's 60%, and you know that you have a route with two channels that you never tried before, you can, in the same way as I showed on the previous slides, multiply the probabilities, 0.6 times 0.6 is 36%.
So this allows us to attach a success probability estimate to routes of which part of the route we might have never tried before.
And this is also a tunable parameter in which you can express your confidence in the state of the Lightning network as it currently is.

So this is about channels we never tried before.
If we've tried a channel before already, we are basing ourselves, this is in LND08, on historical payment results.
So we look at the payments that we made in the past, and we analyze their outcomes, and we use this to estimate the success probability for the route, for the channels that we are considering for the new payment that we're making.

And in 08 we keep this very simple.
We just look at the last outcome of a payment that used that channel.
So we could have used the channel 20 times, but we only look at the last outcome.
And this is just to keep it simple and only make it more complicated if needed.
We could also shovel in a full-fledged neural network, but maybe we don't need it.
So we start here and we see how it goes.

Another thing is that we are optimistic about successes.
So if we've tried a channel before and it was successful, we will just optimistically assume that it will be successful unless proven otherwise.
This optimism factor, as I call it, is hard-coded in LND at 95%, so it's like very certain that it will be successful again.
So we keep trying successful channels.

This is like the exploit part of this.
We keep trying them because unless their fees are much higher than other channels, we will pick them.
And only if something goes wrong, we will change those probability estimates.
So if something goes wrong, either it will be the first time or like on a later attempt, what we're doing then is that we bring down the probability down to zero.

So you can see this in these yellow and red lines.
This is the probability for a failed channel over time.
So right after it failed, we set the probability to zero because it doesn't make sense to try the channel directly after.
But we slowly let it recover back to that a priori probability.
So over time, it slowly comes back because if we wouldn't leave it at zero forever, we would never try this channel again.
Those nodes will never get a second chance and we might be missing out on channels that were bad but become better in the future.
And the speed at which this happens, this recovery is set by using the penalty half lifetime.
So by default, this is set to one hour.
It's relatively short.
So after one hour, the probability of your failed channel is already back up to halfway towards the a priori probability.
So if the a priori is 60% after half an hour, you're already back at 30%.
And you see the red and the yellow line, these are like two different settings of this penalty half lifetime.


How am I doing time-wise?
So I will skip these slides.
I had them in previously but you can look them up later.

#### Pathfinding recap (w/o probabilities)
- Arrows are paths between nodes, not necessarily direct connections (= simplification)
- There are four possible routes:
    (1,3)@ 11 sat  (1,4)@ 14 sat  (2,3)sat @ 8sat (2,4)@ 11 sat
- We don't want to check them all (combinatorial explosion)
- Dijkstra's algorithm (running backwards)
  - First fine the best route from B to C:3
  - Then find the best route from A to B given that we'll proceed to C via 3:(2,3)


#### Accumulating probabilities during pathfinding

Algorithms steps (searching backwards, attempt cost = 12 sat):

- Consider B to C via (3): **cost = 5 + 12 / 0.3 = 45**
- Consider B to C via (4): **cost = 8 + 12 / 0.4 = 38**, replace (3) as best path
- Consider A to C via (1,4): **cost = 6 + 8 + 12 / (0.4 * 0.75) = 54**
- Consider A to C via (2,4): **cost = 3 + 8 + 12 / (0.4 * 0.5) = 71**, discard

Best route: (1,4)@fee: 14 sat, success probability: 30%

Best route w/o probabilities(prev slide)@fee: 8 sat, success probability: 15%


This is how we're actually evaluating this probability penalty during pathfinding.
But I will skip them.
You can check it out later.
It's the same idea but we only do it on the fly while pathfinding.
And then on to plans for the future.


### Payment result tracking in LND 0.9+

So we've got some stuff that's currently in development and there are some PRs further off that haven't even been started.
So this is a list of things that are currently in development.

One thing that we're doing is amount ranges tracking.
So this is already like an improvement upon just keeping the last payment result.
This actually extends this slightly into not only keeping the last outcome but keeping the last success and the last failed outcome.
And the reason for this is that if you only keep the last outcome it can happen that a significant result is overwritten by a very insignificant result.
So suppose you've got a 10 million Satoshi channel and you have a failure for 1 million Satoshi.
This is like significant information.
Like the payment amount wasn't like insane but it still failed.
If you would then do a 1 Satoshi payment through that channel and it would succeed.
That doesn't tell you much because a lot of channels are able to carry 1 Satoshi.
So it is not great that this would actually overwrite the significant failure that we had before.
So therefore we're keeping both a last failure and a last success.

And one thing where this is especially important is in the handling of stuck HTLCs. So this is like a second improvement.
So currently you have stuck HTLCs but nothing is being fed back into probability estimation from that.
So if you look for a new path it will just as happily choose the same path again and maybe it gets stuck again.
So a logical thing to do there is to feed the status of HTLCs in the channels into the probability estimator.
To discourage using channels that already have stuck HTLCs on them.

And one thing to improve this is to like synthetically generate more data to feed into this probability estimator.
And one way to do it is to do a prepaid probe.
So a prepaid probe that means that you are sending a payment with a minimum amount through the route to see if it gets stuck.
If it gets stuck you only lock up a very small amount.
If it doesn't get stuck you send a real payment for the full amount.

And the last thing here is probability extrapolation for untried channels.
And in my opinion this is an important thing to add.
So consider the situation above.
So there is a node B and there is a node C.
There are many paths to go from B to C.
Like let's say 100.
I say actually 53.
They are all one Satoshi.
They are all attractive fee wise.
Their reliability is not other than what we have in reliability for other channels.
But there is also a more expensive maybe more direct route from A to C.
But it's more expensive.
We don't try it.

And what happens here is with the current path finding.
We go into B and we start exploring like all those channels from B to C.
Because all those channels are considered in isolation.
Meaning that basically we get stuck.
So we do have this reliability factor now.
But we still can get stuck on a node that has lots of channels that don't work.
And this PR is about changing the a priori value.
So the a priori value which I explained previously is not a fixed number anymore.
But it will be a mix between this fixed number and what we have seen from this node already before.
So if we have seen a few failures from a node.
We start to lower the probability of its other channels.
So if you are a routing node and you have a few good and a few bad channels.
What could happen when this is merged?
Is that if you don't perform well on a few channels.
This will also affect your reputation for your good channels.
This is an incentive for routing nodes to actually change how they think about channels.
It's not free anymore to keep bad channels open.
If you have bad channels you run the risk that this will actually decrease the revenues that you earn on your good channels.

So this is a way it not only makes it better for the sender.
Because it doesn't get stuck in corners like this.
But it also incentivizes routing nodes to maintain all their public channels.
And the side effect could be that nodes are going to think more carefully about accepting public channels.
You only want to accept channels from someone you know will maintain their channel well.
Because if they don't you accept that channel.
Your reputation on the channels that you really make your revenues on might actually decrease.
And this might even lead to the graph shrinking.
So the graph has already shrunk a little bit.
But maybe it will shrink even more.
Because people become more conscious about what's the impact of my performance on my reputation with senders.
And this is also configurable.
How extreme you want it to be.
It's a configuration parameter.


### Shaping the network

- Senders decide how they rate nodes
- Routing nodes try to maximize profit using knowledge of the behavior of senders

Absurd example: Only send through prime Number capacity channels

Decide what you want the network to look like already today (tunable retroactively):
- **--routerrpc.attemptcost**
- **--routerrpc.penaltyhalflife**
- **--routerrpc.apriorihopprob**
- **--routerrpc.aprioriweight**


So the interesting thing about this is that senders decide how they rate nodes.
They can pick any reputation system that they want.
Routing nodes they just try to optimize profit.
So they try to understand how senders rate them.
And then based on that change the way they act.
So an absurd example is there.
Suppose senders would say from now on I only want to use channels with prime number capacity.
It doesn't make sense at all.
But suppose everyone would start doing this.
Routing nodes will start to open prime number capacity channels.
Because otherwise they have no business anymore.
So the interesting thing is that senders already today.
They are basically shaping a network by setting these standards to what you expect from a routing node.
And how you update a reputation based on the payment results that you are getting.
You are shaping a network.
And you can do this already today with the parameters that I explained in this presentation.


### Future work

So then just a slide on future work.
So this is really very broad.
But on the topic of probability estimation.
I've only been talking about local payment results.
And using that to improve probability estimates.

A few things to look at are:

- **Additional probality sources**:
    - Channel characteristics: You could also do different things like looking at channel characteristics for example. Age. If a channel is very old you can increase the probability of this channel working. Because it has existed for so long there must be a reason for it.

    - Graph Data: You could look at the graph. Maybe look at how nodes are connected.

    - Imported historical payment results: Another thing you can do is to import payment results from someone else. So I've just been talking about importing or using your own results. But if you've got a good friend you trust him. And he did a lot of payments. You could actually import their payment outcomes. And use it to prime your own pathfinding algorithm. So that you don't have to figure out everything yourself. You don't need to make all these exploit traders initially. It's like a pre-primed pathfinding.

- **Additional pathfinding factors**: 
And then there's also additional pathfinding factors. I think Bastian also touched upon the privacy thing. So optimizing paths for privacy. But another thing is latency. I think we don't look a lot at latency at the moment. We're happy with like sub 10 second payments. But if you want to compete with card payments it needs to be sub seconds.
So there's a lot to be done there.
And it also involves like selecting the right path.
If you're selecting paths with routing nodes that have high latency.
Your payments won't be fast.
So this is another thing to penalize on.

- **Improved failure attribution**:
And the third thing I want to mention is improved failure attribution.
So at the basis of this probability estimation is being able to attribute failures that you're getting to specific nodes.
And in the spec there are currently a few gaps.
I had a previous talk at Breaking Bitcoin about this.
That you can send back errors as a node.
And the sender won't be able to pinpoint which is actually the node that generated the failure.
So these are like lingering problems that also come into play with probability estimation.
And probably need to be tackled at some point in time.


That's it.


#### Closing remarks

So I just want to say I think it really is changing the world.
It's like super amazing to work on this.
It's all small steps.
Lots of steps to go.
But yeah I'm a strong believer.
