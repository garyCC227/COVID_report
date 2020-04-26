import React, { Component } from 'react';
import GridItem from "./Style/GridItem.js";
import GridContainer from "./Style/GridContainer.js";
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import CardAvatar from "./Style/CardAvatar.js";
import hand from "./Hands.jpg";
import { Box } from '@material-ui/core';

class HealthCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount = () => {
    var url = 'http://newsapi.org/v2/everything?' +
      'q=healthcare&' +
      'pageSize=15&' +
      'apiKey=cd9567c0810a4be09ec8558e5733d54c';
    var req = new Request(url);

    fetch(req)
      .then(res => res.json())
      .then(res => res.articles)
      .then(res => {
        this.setState({ articles: res })
      });
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h2>Health Care Tips</h2>
              </CardHeader>
              <CardBody>
              {this.state.articles.map((item) => {
                return (
                  <Box mt={1}>
                    <Card>
                      <CardActionArea href={item.url} target="_blank">
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {item.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                )
              })}
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Box my={8}>
              <Card profile>
                <CardAvatar profile>
                  <a>
                    <img src={hand} />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h2>Advices to protect yourself</h2>
                  <h4>1. Wash your hands frequently</h4>
                  <h4>2. Maintain social distancing</h4>
                  <h4>3. Avoid touching eyes, nose and mouth</h4>
                  <h4>4. If you have fever, cough and difficulty breathing, seek medical care early</h4>
                  <h4>5. Stay informed and follow advice given by your healthcare provider</h4>
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}
export default HealthCare;
