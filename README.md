# 02-Office-Queue

## Database

### Ticket
- ID (primary)
- Ticket Code
- ServicetypeID (foreign key)
- Estimated waiting time
- Status

### Service
- ServicetypeID (primary)
- ServiceName
- ServiceTime

### Counter
- CounterId (primary)

### DailySetting
- CounterId  (foreign key)
- ServicetypeID  (foreign key)

### History
- Counter Id (foreign key)
- ServiceType 
- Date
- SpentTime


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