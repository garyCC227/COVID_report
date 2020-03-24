# Design Details

## API Development
### API Protocol
REST

### Independence
Any client will be able to call on our API using standard GET protocols as long as they have followed the proper input instructions. We will try to make the endpoints as self-descriptive as possible so the client will need no knowledge of the internal workings of the API.

### Versioning
We will be using URI versioning for all working iterations of our API by adding a unique version number to the URI of each resource. This will be done to not break programs which are reliant on older versions of our API. Documentation will be provided for each version through Swagger and all functionalities should be self-descriptive.

### RESTful
Our API will follow the RESTful principles; most importantly our API will be stateless and will have a uniform interface. All resources in our API will be identified by a noun which mirrors the name of our database collection. Specific resources can be specified by calling upon the document’s unique ID. Specific parameters for requests will be defined further in the report. For security reasons, we will only be allowing GET requests to go through our API.

Some parameters are passed as a part of requested URL (e.g. ID of the articles), while for some are difficult to be encoded in the URL, they should be passed in the body of the request (e.g. key terms). More information has been provided in the sample request section.

Content-Type will be limited to “application/json” with the majority of the request parameters being in the body and headers of the request.

### Deployment
We will be deploying our API on the Google Cloud Platform as it allows us to easily develop, protect and monitor our API. We also have the option to include JSON Web Tokens and Google API keys in the future. It is also flexible with frameworks and allows us to adapt when we design our web platform.

### Testing
In order to prevent any exceptions. We will have some autotest function to check if there is any error during data transmission such as no response and missing data. Also, input values would be checked before the user request.

## Implementation, Development & Deployment Environment
### API implementation Language
#### Final choice
Python 3 + Flask

#### Justification
Java and Python 3 are considered. Because of the abundance of libraries and simple code structure, Python 3 has been chosen as the implementation language. The usage of Python 3 makes products can be delivered in shorter development time. Another consideration for Python 3 is although all members have used Java before, we are more confident with Python 3 and Flask as they have been used more frequently in our previous studies. 

#### Encountered Challenges
+ Change of requirements always happened throughout the development process. Every time a change is required, part of the code needs to be reviewed and rewritten, although as the API has been partialise into many classes, most of the changes did not involve excessive file changes.

#### Limitations
+ The concurrency performance of Flask application is not very outstanding. Therefore, it is expected that when there are more clients trying to fetch large amounts of data from the API simultaneously, the queuing time could be larger and hence the performance is worse. This may be resolved by running the API on a better server using server applications that support multiple threads/works like Gunicorn.

### Database Component
#### Final choice 
Firestore

#### Justification
We first considered MySQL/PostgreSQL, MongoDB and Firebase then chose Firebase. 

For MySQL and PostgreSQL, as they are both relational databases, much time will need to be spent on designing the schema according to our previous experiences on databases. Also, what has been scraped will also need to be stored as more atomic form to prevent performance loss during querying. However, JSON can be directly read and stored into the document-based database without reducing too much performance. 

Compared to MongoDB, Firebase is more light-weighted, so one can use Firebase without too much deployment on the server. We also decided that Firebase would be more suitable as Phase 2 of the project required a platform. Firebase is easily integratable with Google Cloud Platform and will give us some experience with the Google Cloud Platform functions when the time comes to design our platform. Considering the scale of this project, we finally decided to use Firebase.

#### Encountered Challenges
+ ___Pipeline filters.___ Firebase is a lightweight database and can only support one `array_contain()` function per query, this makes pipeline filters hard to apply on and make a recursive search for keywords impossible. (e.g. articles go through location filter AND date filter AND multiple keyword filters) This is solved by altering the data structure and limited keyword filter to one. We create a list of locations at each article JSON to search on. Multiple keyword filtering process will be handled at API.
+ ___Date Comparasion & filtering.___ Dates are hard to compare as string. We changed the date from string to integer timestamp to filter time.

#### Limitation
FireBase has a daily quota limitation capped at 5.5k read and write, we need to minimise the communications between API and database and do more filtering process at the database stage. In addition, if the number of our users increase exponentially our application might hit this threshold.

### Text Mining Component
#### Final Choice
spaCy (Python library)

#### Justification
SpaCy is an open-source software library for advanced natural language processing, written in the programming languages Python and Cython. It provides extremely fast and accurate trained models for Named Entity Recognizer Feature which we used to pick out keywords of different categories (date, time, countries and cities). It also provides the Phrase Matcher Feature for us to match potential disease and syndrome patterns from text in _O(n)_ time-efficiency. Furthermore, it holds potential ability in providing us with a customized Natural language processor trained by our team. 

Our previous plan is using third-party API like Google Natural Language API and Rapid Text Analysis API to analyse the articles and obtain data. However, from both commercial and performance considerations, we choose to use python library at last. Google API will charge us for massive API requests, and the average response time is around 0.3 second per request which is huge compared to library functions.

Among all NLP libraries (NLTK, spaCy, TextBlob), we choose spaCy as it provides more powerful features and faster algorithm in processing text. Unlike NLTK and TextBlob, which is widely used for teaching and research, spaCy focuses on providing software for production usage.

#### Encountered Challenges
+ ___Selection between vast amounts of NLP python libraries.___ There are a vast number of NLP libraries with distinctive focus and different ease levels to use. We read through their documentation and sample usage and finally chose spaCy as our NLP library. This is a one-way road as it is hard to roll back for any reason (e.g. provides too fewer functions or hard to manipulate)
+ ___General names for diseases and syndromes.___ The name of disease or syndrome appearing in the text can be very different from its formal name. We match all other names of a disease or a syndrome to their formal name by a lookup table. The lookup table can be loaded from outside as a JSON file thus easy to change or update.
+ ___Massive format of date, time string.___ The format of date can be very different between reports (e.g. `dd/mm/yy`, `yy/mm/dd`, `yy-mm-dd`) and sometimes can be a range of dates (e.g. Feb 3-5). This is solved by a two-step process. First, spaCy will extract date-like patterns on a linguistic approach, then vast regular expression catchers are used to capture date information and then recombined into the desired format.
+ ___Unexpected captured patterns from spaCy.___ spaCy holds accuracy at 86.08 on Named Entity Recognition features, relatively high compared to other NLP libraries but we need to capture all these errors. We create our own program to validate all country names and again vast regular language catchers are used to capture unexpected patterns from spaCy.
+ ___Separate Multiple Reports from an Article.___ We can successfully capture all diseases and syndromes in an article but if multiple cases are mentioned in an article, it’s hard to separate them into different reports. This is partially solved by a lookup table and analysis on language features to distinguish very different diseases and most matched syndromes that are mentioned in an article.

#### Limitation
+ Limited to English currently, only English text can pass the filter and get processed into JSON. In addition, spaCy is a young python library and can only support seven languages.
+ The lookup tables need to be imported from outside and they are created by humans. Therefore, the NLP processor can’t do deep learning and improve itself automatically
+ Separation of multiple reports from one article can only be applied to diseases and syndromes. We can’t allocate date and locations to different reports

### Scraper Component
#### Final Choice
Scrappy, beautifulSoup, HTTP requests

#### Justification
Scrappy is used to scrape the HTML file from a website, then we use beautiful-soup as a filter to extract the useful data from the HTML file. Scrapy has been chosen as it is simple to use, fast and extensible framework for web crawling, web scraping. In addition, Scrapy is easier to build and scale large crawling projects, and it automatically adjusts crawling speed using Auto-throttling mechanism We choose beautiful-soup as our HTML filter, since it uses the format lxml to extract HTML data, which is very fast and memory efficient. In addition, it is also simple to use and extensible.

In addition, we use HTTP requests to scrape some easy-access web pages. This improves the scraping speed and simplifies the implementation. and the advantage of HTTP requests is it returns a viewable response, so we can use the response to filter some invalid URLs.

#### Encountered challenges
+ ___Invalid URLs to scrape.___ After scraping a large number of web pages from flu-trackers. We see that flu-trackers sometimes return some websites that are unable to be accessed by scrapers. so that we have to do further filtering to filter out the invalid HTML
+ ___Filtering data from HTML by beautifulSoup.___ Since the web pages have variable CSS class names, it is very hard to filter data by consistent filter configuration. But this is no way to solve since all the web pages have different and various CSS names. So we have to do a trade-off between only extracting the accurate data and extracting some useless data.

  In addition, Since we use consistent filter configuration to extract data, therefore if some HTML files don’t have these attributes, we would lose some key data. To solve this we have to put further exceptions for missed data. This is a challenge since this situation is rare, so we discover this problem after scraping many web pages.
+ ___Scraper can only scrape one page at each script call.___ The scraper in our implementation is not able to scrape multiple pages in one script call. therefore we have to store URLs into a .txt file and use an extract script to run scraper for multiples pages scrapping

#### Limitation
+ In flu-trackers, there are many source URLs for each post that are not able to access. So currently we only have around 1000 data in the database. This is also a problem when we update new data into the database. From current experience in updating the data from flu-trackers, about 40% of new source content URLs are not able to access or invalid, so this would limit the speed of extending our database size


### Geocode Component
#### Final Choice
Google Geocoding API

#### Justification
Google Geocoding API is relatively easy to use and is vastly used in different software applications. Google Geocoding API can transfer the name of a place into a unique id. The response also includes formatted address names and the names of administrative areas where that address belongs to. This enables us to support geo-location taxonomy. (e.g. search for NSW articles and can return Sydney articles). In addition, Google Geocoding API has strong error recovery function and autocomplete function. 

The other potential pick is geolocation python library. It’s easier to use and the responding time will be way faster than requesting API. However, geolocation python libraries only support a limited number of countries (doesn’t support China) as locations and the functions provided are awkward to use. In the other side, Google Geocoding API also has a fairly complete location database thus being able to recognize locations that are not very common, most developers have experience in using Google Geocoding API, therefore Google geocode is more popular and it will be easier to implement the “location to geocode” function in our system.

#### Encountered Challenges
+ ___Duplicate location names.___ We prefer to have more accurate location addresses to be stored in the database. For example, if "Wuhan, China" has already been detected, China should no longer be captured as Wuhan is more accurate than China. Meanwhile, calls to Google API are expensive both in money and time. This is compromised by a two-step process, all location-like patterns will be checked to see if it’s a country name or others and then separated into two lists. The location list will go through the Google Geocoding API first and their country names got stored in another list. Counties which duplicates in that list will not be processed.

#### Limitation
+ Relatively expensive charge. Google charges $5 per 1000 requests, in average each article will cost $0.2 as processing fee.
+ Performance, request for Google API takes time and is comparatively large to other components. Average time for an article to be processed is 0.2 sec when geocoding is off, and it’s around 2 seconds when geocoding is used.


### Operating System
**Linux**

Due to the limitation of Gunicorn, we can only deploy our application on Linux.

### Server Application
#### Final Choice
Gunicorn + Caddy

#### Justification
Gunicorn has been chosen because of the easy configuration and good performance on Flask websites. We considered only using Flask as the server application, but it could be too unstable to be used on the actual product. We added Caddy into the stack as the process of the project to satisfy the requirement of hosting Swagger documentation along with the API. With the usage of Caddy, the API endpoint and the documentation can be deployed separately as two different websites so that reduces the need to integrate swagger into our API. 

#### Limitation
+ Gunicorn can only be deployed on Linux, and as the result the flexibility of our application is restricted to some extents.


## Data Source & Processing
![data_handling](https://user-images.githubusercontent.com/40462331/77386172-28e06180-6dc5-11ea-9cf2-81b821a67637.jpg)

First, we will first scrape all the HTML from the Flu Tracker website using the Scrapy library. The extracted HTML text will then be processed through BeautifulSoup to get text from the HTML elements we specify. Each section of text will then be parsed using the Google NLP API to extract key information such as Location, Diseases and Syndromes. Location can then be further analysed by the Google Geocode API to get its geocode.

All information will be given unique IDs and stored on Firebase in the form of a document. When a user queries our API, the appropriate document will be selected from our database and sent back to the user in JSON format.


## API Usage
### Parameters and Results
Parameters will be passed to our modules using RESTful practices. This means that nouns will be used to access resources and each transaction occurs in isolation. Specific documents in a collection can be accessed by the user providing the start date, end date, key terms and location inside the body of their request. The format of dates will be `yyyy-MM-ddTHH:mm:ss` as per the project specification.

### Sample Usage
As our API will be public, we will only be allowing read requests to our API. Responses will contain a status code along with a response in JSON format. Note that the sample below is only a typical usage of the API. More information will be completed in the development process showing in a Swagger page (https://apinteresting.xyz/docs/).

#### Typical Usage

The detailed form of an article can be large and it takes time to return all related articles in the detailed form at a time. To increase the performance of our API and to reduce the responding time we provide an opportunity to return all related indexed articles back in a brief form. The brief form only contains id, title, URL, date and preview for the main_text. 


##### Request 
```
URL: /v1/news 
method: GET

Headers: 
{
	content-type: “application/json”
	identity: “test”
}

Parameters: 
	start_date: 2020-02-21T23:00:00,
	end_date: 2020-02-21T23:30:00,
	key_terms: coronavirus, 
	location: canada

```

##### Response
```json
{
  "data": [
    {
      "id": "046fu6uh96V9zlcVlUTK",
      "url": "http://www.cidrap.umn.edu/news-perspective/2020/02/canada-lebanon-report-iran-linked-covid-19-cases-concerns-rise",
      "date_of_publication": "2020-02-21 23:05:21",
      "headline": "Canada, Lebanon report Iran-linked COVID-19 cases as concerns rise",
      "main_text": "University of Minnesota. Driven to Discover.Following recent reports of COV..."
    }
  ],
  "apiBy": "APInteresting",
  "resourceFrom": "FluTracker",
  "responseTime": "23 Mar 2020 07:55:15 +0000"
}
```

### Logging
This API will generate one line of log in the backend. With the format of `[Time] | [Identity] [URI] [Response Status Code] [Execution Duration]`.

One example of the log is `2020-03-22 15:01:19,966 | Test /v1/news 200 4908.226728439331`. In this case, the request was initialised on _2020-03-22 15:01:19,966_ with identity header _Test_. The client requested _/v1/news_ and received _200 Success_ in _4908ms_ after the request was received by the server.

If the client did not provide its identity, `[Identity]` will be filled with _<Unknown>_, and the server should return a _401_ status code.

![Log Example](https://user-images.githubusercontent.com/40462331/77386508-eff4bc80-6dc5-11ea-9fdc-a0e958f56f77.jpg)

## Google Docs Link (For editing only)
https://docs.google.com/document/d/1gp_9YRAAlOWdA5vMbkK582caSYSu5WYWGT2G1Z3Y7UE/edit?usp=sharing
