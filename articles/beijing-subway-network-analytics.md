# Modelling the Beijing metro

George Willis

The network data, simulated services and interchange indicators behind TransitFlow.

## A metro network to explore

TransitFlow is a personal project built around an interest in transport networks and maps. The Beijing example brings together station and track data, simulated services and a few ways to examine how the network connects.

The useful questions are fairly simple: which stations connect several lines, where do routes depend on a small number of interchanges, and how should those relationships appear on a map?

## Building the network

The data work starts with station and track geometry. Station names and line membership need to agree before the records can form a usable graph. In the browser demo, stations are nodes and neighbouring stops form connections.

The Python project and the prepared web demo are separate parts of the work. The public pages read a generated JSON bundle; they do not run the Python pipeline or collect new data when you open them.

## The moving trains

The timetable is generated rather than taken from a live feed. The dataset generator uses simple service windows: different headways by time of day, a 25-second dwell time, and 110 seconds between consecutive stops.

That gives a modelled day you can poke around in the browser. It doesn't match real train movements, live headways, or passenger crowds. The animation is just a visual check on the network model, not proof of realistic operations.

## Connections and interchange indicators

The network metrics look at degree and betweenness centrality. Degree counts direct connections; betweenness tracks how often a station sits on the shortest path between any two points.

The dashboard's interchange card displays precomputed numbers from the bundle. The vulnerability score is a rough heuristic combining line count and centrality. It's not a live re-routing simulation or a delay forecast if a station shuts.

## What the model leaves out

A station-level graph ignores walking transfers inside big stations. And the generated timetable doesn't reflect track maintenance, delays, crowded platforms, or short-turned trains.

Some numbers in the generator are placeholder reference values. They'd need real-world verification before using them to evaluate actual transit performance. I've focused the notes here on what the code actually does.

Building this was a practical way to test graph ideas and see how well the data holds together. Having a working map is always a good push to get the data cleaned up.

## Files behind the demo

The [project repository](https://github.com/gcwillis14-coder/transitflow) is private. These paths identify the source and published data for readers with access:

- `web/generate_24h_gtfs.py` prepares the browser dataset.
- `web/data/beijing_bundle.json` holds geometry, simulated trips and network indicators.
- `web/js/app.js` contains the simulation interface.
- `web/js/analytics.js` displays the network analysis.

[Explore the network](https://transitflow-2s4.pages.dev/analytics) · [Open simulation](https://transitflow-2s4.pages.dev/) · [Back to the projects](https://gcwillis14-coder.github.io/portfolio/)
