```mermaid
erDiagram

        BankAccountType {
            creditCard creditCard
bankAccount bankAccount
        }
    


        TransferType {
            income income
costs costs
        }
    
  CategoryIcon {
    Int id PK 
    String name  
    }
  

  Icon {
    Int id PK 
    String name  
    Bytes file  
    Int categoryIconId  
    }
  

  Currency {
    Int code PK 
    String codeS  
    String name  
    Boolean default  
    }
  

  Category {
    Int id PK 
    String name  
    Int iconId  
    TransferType type  
    Boolean default  
    Boolean deleted  
    }
  

  SubCategory {
    Int id PK 
    String name  
    Int categoryId  
    Int iconId  
    Boolean default  
    Boolean deleted  
    }
  

  BankAccount {
    Int id PK 
    Int accountId  
    BankAccountType type  
    String name  
    DateTime expirationDate  
    Int currencyId  
    Boolean default  
    Boolean deleted  
    }
  

  Account {
    Int id PK 
    String username  
    String email  
    String firstName  
    String lastName  
    String hashPassword  
    DateTime createAt  
    Boolean deleted  
    }
  

  UserCategory {
    Int accountId  
    Int categoryId  
    Boolean deleted  
    }
  

  UserSubCategory {
    Int accountId  
    Int subCategoryId  
    Boolean deleted  
    }
  

  MoneyTransfer {
    String uuid PK 
    DateTime dateAt  
    DateTime updateAt  
    TransferType type  
    Int accountId  
    Int categoryId  
    Int subCategoryId  
    Int bankAccountId  
    Float amount  
    Boolean deleted  
    }
  

  ScheduleModel {
    Int id PK 
    String name  
    Boolean deleted  
    }
  

  Schedule {
    Int scheduleModelId  
    Int accountId  
    Int categoryId  
    Int subCategoryId  
    Float defaultAmount  
    Json schema  
    Boolean deleted  
    }
  
    Icon o{--|| CategoryIcon : "CategoryIcon"
    Category o{--|| Icon : "Icon"
    Category o|--|| TransferType : "enum:type"
    SubCategory o{--|| Category : "Category"
    SubCategory o{--|| Icon : "Icon"
    BankAccount o{--|| Account : "Account"
    BankAccount o|--|| BankAccountType : "enum:type"
    BankAccount o{--|| Currency : "Currency"
    UserCategory o{--|| Account : "Account"
    UserCategory o{--|| Category : "Category"
    UserSubCategory o{--|| Account : "Account"
    UserSubCategory o{--|| SubCategory : "SubCategory"
    MoneyTransfer o|--|| TransferType : "enum:type"
    MoneyTransfer o{--|| Account : "Account"
    MoneyTransfer o{--|| Category : "Category"
    MoneyTransfer o{--|| SubCategory : "SubCategory"
    MoneyTransfer o{--|| BankAccount : "BankAccount"
    Schedule o{--|| ScheduleModel : "ScheduleModel"
    Schedule o{--|| Account : "Account"
    Schedule o{--|| Category : "Category"
    Schedule o{--|| SubCategory : "SubCategory"
```
