// Define the array of test cases with edge cases
const testCases = [
    {
      firstName: "",
      lastName: "' OR '1'='1",
      occupation: "名字姓氏"
    },
    {
      firstName: "JohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoe",
      lastName: "<script>alert('XSS')</script>",
      occupation: " John Doe "
    },
    {
      firstName: "John@Doe!",
      lastName: "<strong>Strong Text</strong>",
      occupation: "123456"
    }
  ];

  

  module.exports = testCases;