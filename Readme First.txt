1-Create Database first beacuse it is a DBFirst Approach code.
2-Db query is provided in DatabaseQuery MS SQL SERVER file in current directory.
3-After creating Database, Run below command in .net console to execute it.

Scaffold-DbContext "Server=SERVERNAME;Database=DBNAME;Trusted_Connection=true" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -DataAnnotations -f

