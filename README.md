# Protocol Buffer vs JSON Demo
A demo application designed to compare the speed of a REST API using both JSON and protocol buffers

## Prerequisites
* [Node.js](https://nodejs.org) v6.x.x or above.

## Installation
* Clone repo to local directory
* Run `npm install`

## Usage in Browser
* Run `npm start`
* Navigate to http://localhost:3000
* Choose test type to run and amount of passes for each test
* Click Start Tests to begin
* Open console to view test progress and result summaries

## Testing Methodology
One test will consist of a series of get calls for both protocol buffers and JSON.
### Each get call will:
* Produce a random string (of predetermined size) for all data keys included in the specific test
* Data size will start at 1 byte
* Data size will increase by 50% with each following call
* Data size will increase to a maximum size (varies depending on test type)
* When max data size has been reached the same steps listed above will be repeated for the alternate API type

When all get calls have been made for both protocol buffer and JSON API's, that is considered one pass.
You can specify the amount of passes to be run for each test by using the slider in the UI.  Default is 10 passes.

### Results of tests:
* Two tables will be added to UI displaying the results of every get call made for both API's
* The percent difference will be calculated between the different API calls for each data size
    * For example, during one pass the results of the protocol buffer API with count 1 will be compared to the JSON API with count 1
    * A positive percent difference represents a decrease in processing time for protocol buffers over JSON (protocol buffer was faster)
    * The percent differences for all counts and for all passes will be averaged out to display an overall percent increase or decrase in the API's performance
    * All results are represented using JSON as the baseline and comparing it to protocol buffer (percent decrease indicates protocol buffers were faster)

### Calculated items for each get request includes:
* Time from start of get call till response of get call
* Time from response till decoded data (UI usable data)
* Overall time from initial get request to usable UI data
* Size of response data from the get call

## The Different Testing Types

### Regular Message
Regular message tests will create the following object to be sent back client

````
{
    count: 4, \\ determines the size of data keys to be created
    data: "adsfsadf", \\ random string of data where the length and size are determined by count
    isFinal: false, \\ when count has reached a predetermined amount isFinal will be true ending the single test run
}
````

### Tall Message
Tall message tests will create an object similar to the regular message but with 25 data keys to be sent back client

````
{
    count: 4, \\ determines the size of data keys to be created
    data0:  "adsfsadf", \\ random string of data where the length and size are determined by count
    data1:  "adsfsadf", \\ random string of data where the length and size are determined by count
    data2:  "adsfsadf", \\ random string of data where the length and size are determined by count
    ...
    data24: "adsfsadf", \\ random string of data where the length and size are determined by count
    isFinal: false, \\ when count has reached a predetermined amount isFinal will be true ending the single test run
}
````
