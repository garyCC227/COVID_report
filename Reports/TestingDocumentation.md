# Testing Documentation

## Testing Process Summary
Our application contains three main components that require testing, they are API & Database component, Scraper component and Data Process component. We use design by contract during development. The interfaces between components are invariant. Scraper component is promised to scrape valid date, headline and main text from html and passes into Data Process component, Data Process component is promised to return articles in correct json format to API & Database component.Therefore, Testing of different components can be done in parallel. Each component will focus on their own aspects and choose their own particular test data.

We use both manual and automatic testing mechanisms during our development. At an early stage we use manual testing for debugging and improvement. After the component is behaviouring correctly, we build automated testing scripts by pytest to pick up unexpected errors and make sure every updated version is operating correctly. Manual test tools are in the local file folder and automated testing scripts are in Phase_1/TestScripts folder as per the project specification.

## API & Database Component
### Environment
+ Debian 9
+ Python 3.7
+ requests
+ pytest

### Process Summary
The typical process used in the testing is to make requests using the requests library, supplying specific and symbolic arguments to the API. Then use assertions supported by the pytest to check whether the API returns expected results.

When comparing the results with the expected result, what actually returns are not necessarily predictable sometimes. Considering this, some alternative handling methods have been used, which has been listed in the “Limitation” section.

### Overview of Test Cases
Firstly, test cases can be divided into two cases based on the validity of the input. For invalid input, the API needs to detect these invalid values and return error properly as per the Swagger documentation. For valid input, the API needs to parse and process the request correctly according to both project specification and Swagger documentation. Valid test cases have been created for different endpoints, or even comparing each other between different endpoints to check if some data are actually identical if they are designed to be the same.

For example, when a client made a request without providing its identity in the header, the API should return an error with status code 401, along with the message describing the error. To test this, the test script simulates a request without identity in the header, then uses pytest to assert whether the response has a 401 status code and whether the response message is appropriate. 

Similarly, if the client made a request with a valid date range filter, the API should return all articles within the date range provided, along with a 200 status code. To test this, the test script also simulates the valid request using valid data, then every response article will also be checked whether the publication date is actually satisfying the filter. And the 200 status code will be checked as well.

Furthermore, there are some extra basic tests to check the correctness of functions in the database. Such as writing data into the database, extracting the data by providing keywords, or id. The result would not be checked in detail, it would return a boolean value of true or false or the exact not-null data.

### Details of Test Cases
![Test_API](https://user-images.githubusercontent.com/40462331/77387292-fbe17e00-6dc7-11ea-9571-2c98a396f28e.jpg)

### Coverage
For all of the four endpoints, there are some test cases created for each of the endpoints. Some test cases may be cross-endpoints to increase the reliability of the testing. Most of the error scenarios should have already been covered by most of the test cases.  Approximately, it can be estimated __over half__ of the functionalities have been tested.

For the database, most of the functions have been tested except for query. Some exception cases were also covered in the test.

### Limitations
For some endpoints and functionalities such as searching by keywords, due to the usage of language processing(NLP), the key term may not appear in some result articles. Therefore, there is no efficient way to test this in API testing. However, the correctness should be mostly tested in the NLP testing.

Also when the API is listing the results, the result set is sorted by the term frequency beforehand. However, the validity of this is not tested as well.

Because for the searching of location, the keyword and the result are not necessarily exactly matching as well, the fuzzy comparison is used in these cases as an alternative way. For example, keywords and results may be compared case-insensitively or we may only require a keyword to be the substring of the result.

Since we are using the public platform for the database, most of the functions are completed so that it could automatically throw exception errors. So the tests are quite simple that could not cover any other unexpected cases.   

### Improvement
In the process of testing, some potential bugs in the API have been found and fixed. The test script could also possibly be strengthened by introducing randomize tests, which means generating some random input to test whether the code satisfies the requirements. However, due to time limitation, this has not been implemented with the current test suite.

## Scraper Component
### Environment
+ Python 3.7
+ Scrapy
+ BeautifulSoup

### verview of Test Cases
All of the test cases are used to check the correctness of data preprocessing of the scraper. Given valid HTML files or  URLs, the scraper is required to scrape the correct websites, and the extracting data is needed to be complete and accurate. 

For testing the correctness of data preprocessing of the scraper, we provided a consistent valid HTML file and consistent URLs. By using the given files, we test functional correctness of these functions by comparing the function output with the correct filtered data which is manually filtered. Also, the data source website sometimes returns invalid HTML, to avoid this we also provided some most frequently-seen invalid HTML to see if data preprocessing functions can ignore these HTML.

The scraper can also auto-update the newer data into the database and filter out the old-time data. To test this functionality, we always auto-generate newer and old-time data to check the functional correctness.

### Details of Test Cases
![Test_Scraper_1](https://user-images.githubusercontent.com/40462331/77387423-57ac0700-6dc8-11ea-92be-0ef252e3baf7.jpg)
![Test_Scraper_2](https://user-images.githubusercontent.com/40462331/77387455-6e525e00-6dc8-11ea-8de8-dd7d7ebad055.jpg)

### Coverage
The test script achieves function coverage by testing all the core functions in scraper. Some of the functions are not tested since they are just used to call the core functions for combining functionalities together.

The branch coverage is also achieved by providing valid/invalid HTML files and URLs to allow all of the branches in each function to be run, and then we test the branch output with the expected output to check the correctness.

### Limitations
Since the data source website always returns variable URLs and HTML, we cannot test the scraper with all possible input. And the scraper is only able to scrape one HTML file at each script call in our implementation, so it is impossible to scrape multiple HTML in one test script. Therefore, we have to manually test if the scraper can scrape multiple HTML pages.

### Improvement
During the test, we noticed that we didn’t have a method to check if the HTML file is valid. This is important since all the previous scraper codes are run under the assumption that all input HTML files are valid. And the update functionality needs to compare the latest date of our database with the date of new coming data, since the latest date of database update periodically,  so we modify the test script and now it is able to auto-generate newer and old-time data to ensure the test covers both of the situations.  

## Data Process (Text Mining) Component
### Environment
+ Python 3.7
+ pytest

### Overview of Test Cases
Data processing component contains four minor components, Date_formatter, Location_checker and Geocode_Locaion will be imported in NLP_Processor. Each component will be tested.

Date_formatter needs to extract date and time from an extracted pattern from spaCy for multiple times in for an article and return a period of time or an exact time in desired format. Date_formatter will firstly be tested against different date patterns (e.g. 2020/12/12), date range patterns (e.g. Feb 3-5), time patterns (e.g. 12:15 pm) to examine its correctness for single pattern, then be tested against multiple patterns to examine its ability to analyze date and time patterns in order to return event date or event date period.

Location_checker and Geocode_Locaion will be tested together. They will be tested against a bunch of location-like patterns including countries’ general name, countries’ short name, cites’ name and non-location name. They need to capture the names of non-duplicate locations and transfer them into google place id.

The above minor components will then combine in NLP_Processer for an overall testing against some short articles, the output report, location_keywords, keyword_frequency_list will be examined to check correctness. The input test data will include the main text and the publication date of articles. Then some longer articles which contain multiple cases will be tested to examine NLP_Processer’s ability in separating reports.

### Coverage
Date_formatter, Location_checker and Geocode_Locaion will be tested individually with specific test data. Then they will be combined and tested with NLP_Processer to check the overall performance. All known potential failures will be tested and all functions will be tested.

### Details of Test Cases
#### Part 1
![test_dp_1](https://user-images.githubusercontent.com/40462331/77387581-c721f680-6dc8-11ea-9b0d-ab96fb923987.jpg)
#### Part 2
![test_dp_2](https://user-images.githubusercontent.com/40462331/77387574-c5583300-6dc8-11ea-95b1-c6a376de7ec9.jpg)
#### Part 3
![test_dp_3](https://user-images.githubusercontent.com/40462331/77387577-c6896000-6dc8-11ea-890f-5b55175b202a.png)

### Limitations
We can only test cases that we can imagine or we have encountered, therefore we can’t assure all aspects are tested. We don’t know if we catch all error patterns when processing. For example in testing the Date_formatter, we can only test the format of date or time that we have encountered and eliminate incorrect captured patterns that we have seen. Furthermore, the amount of test input is relatively small for NLP_Processer. As we need to check the input manually to decide correct output.

### Improvement
During testing we captured some incorrect patterns which should not bypass the filter, so we updated the filter several times to reinforce its ability to distinguish valid and invalid patterns. We also observed duplicated location names in a single report thus fix a logic bug in Geocode_Locaion component. By observing inputs and outputs from NLP_Processer, we can update vocabulary of NLP_Processer thus it can recognize and capture more diseases and syndromes.


## Google Doc (For editing only)
https://docs.google.com/document/d/16oLGMe3ZBBvxQ3fYiqakSZdpYLgDpHB-q5DW5KPHMG8/edit
