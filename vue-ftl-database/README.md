# VUE FTL Database

This project is only there to store the sqlite Database for developpement, sequelize testing and data schema

## Sequelize trick

create = build + save
https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances

## Database Schema

```mermaid
erDiagram
    USER ||--|| SHIP : owns
    USER {
        string userName
        string email
        string password
        string uuid
        int credits
        int shipId
    }
    SHIP ||--o| STARSYSTEM : located
    SHIP ||--o| PLANET : located
    SHIP ||--o{ CARGO : "has many"
    SHIP ||--|| LOCATION : "has one"
    SHIP {
        string name
        int fuel
        int hull
        float fuelEfficiency
        float hullFactor
        int starSystemId
        int planetId
        string situation
    }
    CARGO }|--|| CARGOTYPE : is
    CARGO {
        string uuid
        float quantity
        int cargoTypeId
        int shipId
    }
    CARGOTYPE {
        string name
    }
    GALAXY ||--|{ STARSYSTEM : "contains many"
    GALAXY{
        float radius
        int starCount
    }
    STARSYSTEM ||--o{ EXPLORATIONEVENT : has
    STARSYSTEM }|--|| STELLARTYPE : is
    STARSYSTEM ||--o{ ANOMALY : has
    STARSYSTEM ||--|{ PLANET : "has many"
    STARSYSTEM ||--o{ AMENAGEMENT : has
    STARSYSTEM {
        string name
        string uuid	
        int typeId
        float positionX
        float positionY
        string anomaly
        int galaxyId
    }
    STELLARTYPE {
        string name
        string color
    }
        AMENAGEMENT {
        string type
        string name
        string description
    }
    PLANET ||--o{ ANOMALY : has
    PLANET ||--o{ AMENAGEMENT : has
    PLANET }|--|| PLANETTYPE : is
    PLANET {
        string name
        string uuid	
        int typeId
        int starSystemId
        float orbit
        float minerals
        string anomaly
    }
    PLANETTYPE {
        string name
        string color
        float radius
        bool landable
    }
    ANOMALY {
        string type
        string name
        string description
    }
    EXPLORATIONEVENT {
        string type
        string name
        string description
    }
    LOCATION ||--o| PLANET : "has one"
    LOCATION ||--o| STARSYSTEM : "has one"
    LOCATION ||--o| GALAXY : "has one"
    LOCATION {
        string situation
        float orbit_semiMajorAxis
        float orbit_semiMinorAxis
        float orbit_trueAnomaly
        float position_X
        float position_Y
        float position_Z
    }
```