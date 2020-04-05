import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class ArticleDialog extends React.Component {
  constructor(){
    super();
    this.state = {
      open:false,
      scroll:'paper',
      report:{
        url :'Loading...'
      }
    }
    this.onBoxOpen = this.onBoxOpen.bind(this);
    this.onBoxClose = this.onBoxClose.bind(this);
    
  }

  GetReport = async () =>{
    const url =`https://apinteresting.xyz/v1/news/${this.props.article.id}`
    const res = await fetch(url, {
      method: "GET",
      headers: { identity: "header" }
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        // console.log(res.data);
        return res.data;
      });
    console.log(res);
    this.setState({report: res});
  }

  onBoxOpen(){
    this.GetReport();
    this.setState({open:true, scroll:'paper'});
  }

  onBoxClose(){
    this.setState({open:false});
  }


  render(){

    return (
      <div>
        <Button onClick={this.onBoxOpen} size="small" variant="outlined" color="primary">
          View Report
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.onBoxClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle>{this.props.article.headline}</DialogTitle>
          <DialogContent dividers={this.state.scroll === 'paper'}>
            <DialogContentText
              ref={this.state.descriptionElementRef}
              tabIndex={-1}
            >
              <div>
                <Button size="small" variant="outlined" color="primary"> <a href={this.state.report.url}> View Article</a> </Button>
                <p>{JSON.stringify(this.state.report.reports)} </p>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onBoxClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}