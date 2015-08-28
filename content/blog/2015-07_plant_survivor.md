---
created_at: 2015-07-27
kind: article
publish: true
title: "Plant Survivor"
authors:
- aleksander
- kasia
tags: 
- technology

extract: Maintaining plants at home isn't always simple. Here are some tips how to make it easier with a little help with modern tech.
---

I have a few plants in my appartment, and some time ago one of them died from drought. My activities left me little time to care about the plants and I was always telling myself “I’ll do it tomorrow morning/after I go home”. Their growth was very limited. From time to time I removed dead leaves. I was not happy about it.

![deadleaves](/assets/images/blog/deadleaves.jpg "deadleaves")

As a programmer/hacker/geek I needed to do something different, something more than add alarms and notifications because that would be “too normal”. My idea was to monitor moisture of the soil of my plants and get to know how often I needed to water it. I had already created a similar software that I could use - named [HomeIO][1] and used to monitor my small wind turbine system. The problem was that I didn't have the hardware for my plants.


![windturbine](/assets/images/blog/windturbine.jpg "windturbine")


The popularity and easiness of Arduino platform convinced me to choose it. I bought sensor shields for Arduino (which made connecting sensors as easy as it could be), moisture sensors and light sensors. I thought that the amount of light can have an impact on the speed of water consumption. I then connected the Arduino to my home server where I deployed an instance of [HomeIO][1].

![hardware](/assets/images/blog/hardware.jpg "hardware")

After a few days a draft version of the system was online. At first, only one moisture sensor and one light sensor were used. I added two more moisture sensors later. 

![moisture_all](/assets/images/blog/moisture_all.jpg "moisture_all")

![moisture_shadow](/assets/images/blog/moisture_shadow.jpg "moisture_shadow")

After about two weeks a problem with electrolysis occured. A part of the moisture sensor which had been inserted into the soil had corroded. Within a few days I replaced it with nails and changed the Arduino firmware to power moisture sensor less often: every few seconds for a very short period of time. It helped to increase the sensors lifetime. Anyway, the nails are quite easy to replace.

![moisture_nail](/assets/images/blog/moisture_nail.jpg "moisture_nail")

The next step was when Kasia brough a plant to Nukomeet office in Poznań. I integrated a moisture sensor, an Arduino and a Raspberry Pi - exactly as I had done it in my apartment  - very easily.

![nukoplant](/assets/images/blog/nukoplant.jpg "nukoplant")

Results:

- I know how often I should water my plants - every 4 days

- Different plant species need different type of soil and have different water usage which can be assesed only by the observation

- Light has a very small impact on the speed of water consumption

- [HomeIO][1] backend has very small CPU and RAM usage and allows to store in memory month of measurements very easily. You can deploy it on Raspberry Pi and it will be lightning fast.


Future

- I want to think about some not expensive hardware which can water plants. I’d set control routines to water plant if moisture level drop below proper level and check how the plant will growth while having constant moisture level.

- There is a lot of ideas to improve [HomeIO][1] backend and frontend.

- More sensors: pressure, humidity, temperature

- Share Nukomeet plant frontend connection online


![liveplant](/assets/images/blog/liveplant.jpg "liveplant")

![freshleaf](/assets/images/blog/freshleaf.jpg "freshleaf")

[1]:http://homeio.org.pl/