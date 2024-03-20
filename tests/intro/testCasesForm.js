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

  const dateCases = [
    "2023-12-25", // Standard valid date
    "", // Empty string
    "2030-02-30", // Invalid date (February 30th doesn't exist)
    "1999-01-01", // Date in the past
    "abcd-ef-gh", // Non-date format
    "2023-02-29", // Non-leap year February 29
    "2024-02-29", // Leap year February 29
    "0000-00-00", // All zeros
    "2023-12-31T23:59:59", // Date with time
    "2023/12/25" // Alternate date format (slashes instead of dashes)
  ];
  

  module.exports = testCases, dateCases;