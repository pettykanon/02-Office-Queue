# 02-Office-Queue

## Database

### Ticket
- ID (primary)
- Ticket Code
- ServicetypeID (foreign key)
- Estimated waiting time

### Service
- ServicetypeID (primary)
- ServiceName

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
