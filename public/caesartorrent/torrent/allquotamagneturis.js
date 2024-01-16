'use strict'
const e = React.createElement;
class Comp1 extends React.Component {
    constructor(props) {
       super(props);
       this.getallmagneuris = this.getallmagneuris.bind(this);
       this.state = {quotas:[],quotaname:"",quotatype:"",contributor:""}
    }
   
    componentDidMount() {
       //window.addEventListener('load', this.handleLoad);
       this.getallmagneuris();
       //alert("Hi")
    }
    async getallmagneuris(){
      const url = window.location.href
      let access_token = url.split("?")[1].replace("j=","")
      let contributor = url.split("?")[2].replace("c=","")
      let quotaurl = url.split("?")[0].replace("http://localhost:3000/caesartorrent/","")
      let quotaname = quotaurl.split("/")[1]
      let quotatype = quotaurl.split("/")[2]

      let json = {"quotaurl":quotaurl,"contributor":contributor}
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
        };
        const getlastblockchainresp = await axios.post("http://127.0.0.1:5000/getallmagneturi",json,config) 
        
        this.setState( state => ({
          quotas: state.quotas.concat(getlastblockchainresp.data.quotamagneturis)
      }));
      this.setState( state => ({
        quotaname: quotaname
    }));
    this.setState( state => ({
      quotatype: quotatype
      }));
      this.setState( state => ({
        contributor:contributor
        }));
      
    }
    render () {
        //console.log(this.state)
        const quotas = this.state.quotas
        const quotaname = this.state.quotaname
        const quotatype = this.state.quotatype
        const contributor = this.state.contributor
        return (
          <div>
            <h1>Quota files Contributed from {contributor}</h1>
            {
              quotas.length > 0 &&
                <div>
                  {quotaname } - {quotatype} 
                  
                  {quotas.map((quota,idx) => {return (
                    <div>
                      
                      <p style={{color:"white"}}>Contributed Filename: {quota.torrentfilename}</p>
                      <br></br>
                      
                    </div>
                  )})}
                </div>
            }

          </div>
        )
    }
}


// Find all DOM containers, and render our component into them.
var containers = document.querySelectorAll('.cfe-app')
containers.forEach(domContainer => {
    // Read the user ID from a data-* attribute.
    const userid = domContainer.dataset.userid
    // render the component into the DOM
    ReactDOM.render(
      e(Comp1, { userid: userid}),
      domContainer
    )
});