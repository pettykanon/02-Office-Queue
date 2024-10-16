# 02-Office-Queue

## Database

### Counter

- Id (primary key)

### Service

- Id (primary key)
- Name
- AverageTime (in minutes)

### Ticket

- Id (primary key)
- Code
- ServiceId (foreign key)
- StatusId (foreign key)
- CounterId (foreign key)

### DailySetting

- Id (primary key)
- CounterId (foreign key)
- ServiceId (foreign key)

### History

- Id (primary key)
- CounterId (foreign key)
- ServiceId (foreign key)
- Date

### Tickt Status

- Id (primary key)
- status

## API Stories

### Get Ticket APIs

- POST ticket

- GET ticket

### Next Customer

- POST history

- UPDATE Next Customer (Waiting -> Serving)

### Call Customer

- GET queue

### See Stats

- GET service type customer number

- GET customer served by each counter

### Config Counters

- GET counters service types

- POST counters service types

### Get Estimated Time

- GET estimated time with formula

### Notify Customer Served

- UPDATE Current Customer (Serving -> Served)
