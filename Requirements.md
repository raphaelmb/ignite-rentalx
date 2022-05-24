**FR**: Functional requirements

**NFR**: Non functional requirements

**BL**: Business logic

# Car register

**FR**
Should be able to register a new car.

**BL**
Should not be able to register a new car with an existent license plate.
The car should be available by default.

- The user responsible for the register should be an admin user.

# Car list

**FR**
Should be able to list all available cars.
Should be able to list all available cars by category name.
Should be able to list all available cars by brand name.
Should be able to list all available cars by the car's name.

**BL**
The user doesn't need to be logged in.

# Specification register

**FR**
Should be able to register a specification for a car.
Should be able to list all specifications.
Should be able to list all cars.

**BL**
Should not be able to register a specification for a non registered car.
Should not be able to register an existent specification for the same car.
The user responsible for the register should be an admin user.

# Car image register

**FR**
Should be able to register the car's image.
Should be able to list all cars.

**NFR**
Use multer to upload files

**BL**
The user should be able to register more than one image of the same car.
The user responsible for the register should be an admin user.

# Car rent

**FR**
Should be able to register a rent

**NFR**

**BL**
The minimal duration for the rent is 24 hours.
Should not be able to register a new rent if there is a rent open for the same user.
Should not be able to register a new rent if there is a rent open for the same car.