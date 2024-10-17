TEMPLATE FOR RETROSPECTIVE (Team 02)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done:
  - 7 vs. 6
- Total points committed vs. done:
  - 56 vs. 53
- Nr of hours planned vs. spent (as a team)
  - 96h vs. 93h 16m 

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story                     | # Tasks | Points | Hours est. | Hours actual | Done/Not Done |
| ------------------------- | ------- | ------ | ---------- | ------------ | ------------- |
| _#0_                      | 8       |        | 44h        | 37h 16m      | Done          |
| _#Get Ticket_             | 6       | 3      | 8h         | 10h 43m      | Done          |
| _#Next Customer_          | 6       | 13     | 11h        | 12h 18m      | Done          |
| _#Call Customer_          | 5       | 3      | 6h         | 7h 6m        | Done          |
| _#See Stats_              | 5       | 21     | 8h         | 12h 8m       | Done          |
| _#Config Counters_        | 6       | 5      | 7h         | 8h 15m       | Done          |
| _#Get Estimated Time_     | 3       | 8      | 4h         | 2h 30m       | Done          |
| _#Notify Customer Served_ | 2       | 3      | 3h         | 3h           | Not Done      |


> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Hours per task average: 
    - Estimated: 2,2857
    - Actual: 2,2207
  - Standard Deviation:
    - Estimated: 2h 21m
    - Actual: 1h 54m
- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$

    - Result: 5460m/5596m - 1 = -0,0243
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

    - Result: 0,3523
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases 
  - Coverage (if available)
- E2E testing:
  - Total hours estimated:
    - **6h**
  - Total hours spent:
    - **8h 48m**
- Code review 
  - Total hours estimated:
    - **9h**
  - Total hours spent:
    - **11h 36m**
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  - Lack of initial mutual knowledge among team members, including skills. 
  - Incomplete understanding of user stories. Backend and frontend components were relatively well-estimated, however, we encountered challenges in integration and testing/bug fixing. 
  - In some cases, we underestimated the effort required for post-ticket tasks, such as developing necessary DAO functions and planning the implementation structure.

- What lessons did you learn (both positive and negative) in this sprint?
  - We should assign significantly more weight to story points. In this project, we've observed that it's rare for one story to require twice or three times as much effort as another.
  - Task assignments should be made to team members at the beginning of the sprint.
  - We should spend less time on sprint planning and invest more time in meetings done during the sprint in order to improve in-sprint organization.
  - The importance of UI and API design should not be underestimated, we also gave same estimations to different stories but at the end some of them were more complex than others.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  - We were able to achieve 6 out of 7 
  - We solved the problem about making the queue real-time in the UI.
  
- Which ones you were not able to achieve? Why?
  - Improve the organization in the github repository
  - Notify customer story were not be able to achieved because requirement was not clear to team and we decided to eliminate it after having some work.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Organize better the repository of the project. (decide standard names for the branches and merge them progressively into one unique branch)
  - Testing in a consistent way (choosing intuitive frameworks and assigning more time to tests tasks)

- One thing you are proud of as a Team!!
  - The final product obtained by a perfect team spirit