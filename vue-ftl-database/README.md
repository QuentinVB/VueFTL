# VUE FTL Database

This project is only there to store the sqlite Database for developpement, sequelize testing and data schema

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
    CARGO ||--|| CARGOTYPE : is
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
    STARSYSTEM ||--o{ EXPLORATIONEVENT : is
    STARSYSTEM }|--|| STELLARTYPE : is
    STARSYSTEM ||--o{ ANOMALY : has
    STARSYSTEM ||--|{ PLANET : "has many"
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
    PLANET ||--o{ ANOMALY : has
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
```