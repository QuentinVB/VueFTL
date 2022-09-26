- Gl : GalaxyLocation
- S : StarSystem
- Sl : StarSystem Location
- Po : Planet Orbit
- 🌌 : Galaxy Space
- ⭐ : StarSystem Space

|↗️| Gl | S  | Sl | Po |
|----|----|----|----|----|
|**Gl** | 🌌 | 🌌 | ⬆️🌌  | ❌  |
|**S** | 🌌  | 🌌  | ⬆️🌌  | ❌  |
|**Sl** | ⬆️🌌 | ⬆️🌌 | ⭐ | ⭐ |
|**Po** | ⬆️🌌 | ⬆️🌌 | ⭐ | ❌  |

"whenever the origin, except starSystem if the destination is Gl or S : use galaxyCoordinates"

if destination starSystem differ from origin
then compute in galactic frame of reference for origin AND destination (galactic location, starsystem position, starSystem holding starsystemLocation, starsystem holding planet and planetLocation)
else compute within local starsystem frame of refence
