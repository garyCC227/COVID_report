# Design Details

## API Development
### API Protocol
REST

### Independence
Any client will be able to call on our API using standard GET protocols as long as they have followed the proper input instructions. We will try to make the endpoints as self-descriptive as possible so the client will need no knowledge of the internal workings of the API.

### Versioning
We will be using URI versioning for all working iterations of our API by adding a unique version number to the URI of each resource. This will be done to not break programs which are reliant on older versions of our API. Documentation will be provided for each version through Swagger and all functionalities should be self-descriptive.

### RESTful
Our API will follow the RESTful principles; most importantly our API will be stateless and will have a uniform interface. All resources in our API will be identified by a noun which mirrors the name of our database collection. Specific resources can be specified by calling upon the document’s unique ID. Specific parameters for requests will be defined further in the report.  For security reasons, we will only be allowing GET requests to go through our API. 

If pagination is required for certain datasets, we will follow the HATEOAS principle and provide hypermedia links in the response to link to previous and next pages of data. Further HATEOAS responses may be added depending on how much functionality is required.

Some parameters are passed as a part of requested URL (e.g. ID of the articles), while for some are difficult to be encoded in the URL, they should be passed in the body of the request (e.g. key terms). More information has been provided in the sample request section.

Content-Type will be limited to “application/json” with the majority of the request parameters being in the body and headers of the request. 

### Deployment
We will be deploying our API on the Google Cloud Platform as it allows us to easily develop, protect and monitor our API. We also have the option to include JSON Web Tokens and Google API keys in the future. It is also flexible with frameworks and allows us to adapt when we design our web platform. 

### Testing
In order to prevent any exceptions. We will have some autotest function to check if there is any error during data transmission such as no response and missing data. Also, input values would be checked before the user request. 


## Implementation, Development & Deployment Environment
### API implementation Language
**Python 3 + Flask**

Java and Python 3 are considered. Because of the abundance of libraries and simple code structure, Python 3 has been chosen as the implementation language. The usage of Python 3 makes products can be delivered in a shorter development time. Another consideration for Python 3 is although all members have used Java before, we are more confident with Python 3 and Flask as they have been used more frequently in our previous studies.

### Database Implementation
**Firestore**

We first considered MySQL/PostgreSQL and MongoDB. For MySQL and PostgreSQL, as they are both relational databases, much time will need to be spent on designing the schema according to our previous experiences on databases. Also, what has been scraped will also need to be stored as more atomic form to prevent performance loss during querying. However, json can be directly read and stored into the document-based database without reducing too much performance. 
At first we decided to use MongoDB. However, upon further thought we decided that Firestore would be more suitable as Phase 2 of the project required a platform. Firestore is easily integrateable with Google Cloud Platform and will give us some experience with the Google Cloud Platform functions when the time comes to design our platform. 

### Text analysis implementation
**Google natural language API, Rapid text analysis API**

For some assisting purpose, we plan to use some third-party API to analyse the text that has been fetched, to retrieve some useful or key data from the text. We noticed that Google has provided some very good API for us to achieve this. Therefore, we use Google Natural Language API and Rapid Text Analysis API to analyse the articles and obtain data.
	
### Scraper implementation
**Scrappy, beautiful soup**

Scrappy is used to scrape the HTML file from a website, then we use beautiful-soup as a filter to extract the useful data from HTML file. Scrapy has been chosen as it is simple to use, fast and extensible framework for web crawling, web scraping. In addition, Scrapy is easier to build and scale large crawling projects, and it automatically adjusts crawling speed using Auto-throttling mechanism
We choose beautiful-soup as our html filter, since it uses the format lxml to extract html data, which is very fast and memory efficient. In addition, it is also simple to use and extensible.

### Geocode Implementation
**Google geocoding API**
	
Google geocoding API is relatively easy to use and is vastly used in different software applications. Google geocoding API can transfer a name of place in to an unique id. They have a fairly complete location database thus being able to recognize locations that are not very common or even in different languages.

In addition, most developers have experience in using Google geocoding API, therefore Google geocode is more popular and we will be easier to implement “location to geocode” function in our system.

### Operating System
**Linux**

Due to the limitation of Gunicorn, we can only deploy our application on Linux.

### Server Application
**Gunicorn**

Gunicorn has been chosen because of the easy configuration and good performance on Flask websites. We considered only using Flask as the server application, but it could be too unstable to be used on the actual product. 

## Data Source & Processing
![data_handling](https://user-images.githubusercontent.com/40462331/75735103-bbe12b00-5d34-11ea-8f09-f0ba25637fb1.png)

First, we will first scrape all the HTML from the Flu Tracker website using the Scrapy library. The extracted HTML text will then be processed through BeautifulSoup to get text from the HTML elements we specify. Each section of text will then be parsed using the Google NLP API to extract key information such as: Location, Diseases and Syndromes. Location can then be further analysed by the Google Geocode API to get its geocode.  

All information will be given unique IDs and stored on MongoDB in the form of a document. When a user queries our API, the appropriate  document will be selected from our database and sent back to the user in JSON format. 

## API Usage
### Parameters and Results
Parameters will be passed to our modules using RESTful practices. This means that nouns will be used to access resources and each transaction occurs in isolation. Specific documents in a collection can be accessed by the user providing the start date, end date, key terms and location inside the body of their request. The format of dates will be `yyyy-MM-ddTHH:mm:ss`.   

### Sample Usage
As our API will be public, we will only be allowing read requests to our API. Responses will contain a status code along with a response in JSON format. Note that the sample below is only a simplified version of the API. More information will be completed in the development process showing in a Swagger page.

#### Usage 1:

The detailed form of an article can be large and it takes time to return all related articles in detailed form at a time. To increase the performance of our API and to reduce the resposing time we provide an opportunity to return all related indexed articles back in a brief form. The brief form only contains id, title, URL, date and preview. We recommend our user to get details of an specific article by id as usage 2. The URL of request, the header of request and the sample response are shown below.

##### Request 
```
URL: /v1/news 
method: GET

Headers: 
{
	content-type: “application/json”
}

Body: 
{ 
	start_date: 2020-01-01T00:00:00,
	end_date: 2020-03-01T00:00:00,
	key_terms: [ “coronavirus” , “flu” ], 
	location: “China”
}
```

##### Response
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "title": "Novel Coronavirus – Japan (ex-China)",
            "url": "https: //flutrackers.com/forum/forum/-2019-ncov-new-coronavirus/china-2019-ncov/831003-china-covid-19-cases-outbreak-news-and-information-week-9-february-23-february-29-2020",
            "date": "2020-02-23 12:12:00",
            "preview": "On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019- nCoV) from Wuhan, Hubei Province, China..."
        },
        {
            "id": 2,
            "title": "...",
            "url": "...",
            "date": "...",
            "preview": "..."
        },
        ...
    ]
}
```

#### Usage 2
Each article has a unique id restored in our database, the id of an article is specified by an integer. When a user wants to request an article in detailed form, they can achieve this by appending the id of the article to the end of the request URL. The detailed form of an article will contain URL, date of publish, headline, main text and a list of corresponding reports. The sample request URL, request header and response is shown below.

##### Request 
```
URL: /v1/news/1
method: GET

Headers: 
{
	content-type: “application/json”
}
```

##### Response
```json
{
    "status": 200,
    "data": {
        "url": "https://flutrackers.com/forum/forum/-2019-ncov-new-coronavirus/china-2019-ncov/831003-china-covid-19-cases-outbreak-news-and-information-week-9-february-23-february-29-2020",
        "date_of_publication": "2020-02-23 12:12:xx",
        "headline": "Novel Coronavirus – Japan (ex-China)",
        "main_text": "On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019- nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.",
    "reports": [
            {
                "event_date": "2020-01-03 xx:xx:xx to 2020-01-15",
                "locations": [
                    {
                        "country": "China",
                        "location": "Wuhan, Hubei Province"
                    },
                    {
                        "country": "Japan",
                        "location": ""
                    }
                ],
                "diseases": [
                    "2019-nCoV"
                ],
                "syndromes": [
                    "Fever of unknown Origin"
                ]
            }
        ]
    }
}
```

#### Usage 3
Usage 3 is similar to usage 1 but instead of returning articles in brief form, this request will return all related articles in detailed form. When a user wants to  request all detailed articles at once, they can append “all” at the end of url. The sample request URL, request header and response is shown below.

##### Request
```
URL: /v1/news/all
method: GET

Headers: 
{
	content-type: “application/json”
}

Body: { 
	start_date: 2020-01-01T00:00:00,
	end_date: 2020-03-01T00:00:00,
	key_terms: [ “coronavirus” , “flu” ], 
	location: “China”
}
```

##### Response
```json
{
    "status": 200,
    "data": [
        {
        "url": "https://flutrackers.com/forum/forum/-2019-ncov-new-coronavirus/china-2019-ncov/831003-china-covid-19-cases-outbreak-news-and-information-week-9-february-23-february-29-2020",
        "date_of_publication": "2020-02-23 12:12:xx",
        "headline": "Novel Coronavirus – Japan (ex-China)",
        "main_text": "On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019- nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.",
    "reports": [
            {
                "event_date": "2020-01-03 xx:xx:xx to 2020-01-15",
                "locations": [
                    {
                        "country": "China",
                        "location": "Wuhan, Hubei Province"
                    },
                    {
                        "country": "Japan",
                        "location": ""
                    }
                ],
                "diseases": [
                    "2019-nCoV"
                ],
                "syndromes": [
                    "Fever of unknown Origin"
                ]
            }
        ]
    }
        …
    ]
}
```

#### Error Handling
If the request is malformed, the status code will imply the type of the error and there will be a message to explain it.



#### Usage 4
Request single detailed article with invalid id. If user request article but with invalid id, 404 as status code will be returned.

##### Request
```
URL: /v1/news/0000000
method: GET
Headers: 
{
	content-type: “application/json”
}
```

##### Response
```json
{
    "status": 404,
    "data": {
	    "message": "The requested article does not exist."
    }
}
```

#### Usage 5
Request articles with invalid parameters. If a user request with a malformed header, status code 400 will be returned.

##### Request
```
URL: /api/v1/news
method: GET

Body: 
{ 
	start_date: 11111-invalid,
	end_date: 2020-03-01T00:00:00,
	key_terms: [ "coronavirus", "flu" ], 
	location: “China”
}
```

##### Response
```json
{
    "status": 400,
    "data": {
	    "message": "Malformed Request"
    }
}
```

## Google Docs Link (For editing only)
https://docs.google.com/document/d/1gp_9YRAAlOWdA5vMbkK582caSYSu5WYWGT2G1Z3Y7UE/edit?usp=sharing
