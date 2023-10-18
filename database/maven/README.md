
Database management and versioning was performed using the flyway tool.

* Info
  * mvn  flyway:info -Pdb-question
  * mvn  flyway:info -Pdb-user

* Clean
  * mvn  flyway:clean -Pdb-question
  * mvn  flyway:clean -Pdb-user

* Create structure from initial script
  * mvn  flyway:migrate -Pdb-question
  * mvn  flyway:migrate -Pdb-user