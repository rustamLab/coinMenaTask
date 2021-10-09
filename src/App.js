import React, { useState, useEffect } from 'react';

function Header(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const activeTabTrigger = () => {
    if(activeTab == 'repositories'){
      setActiveTab('developers');
      props.navigate();
    }else{
      setActiveTab('repositories');
      props.navigate();
    }
  }

  return (
    <div style={{
        width:'90%',
        margin:'0 auto',
        backgroundColor:'#f6f8fa',
        borderTop:'1px solid #d8dee4',
        borderLeft:'1px solid #d8dee4',
        borderRight:'1px solid #d8dee4',
      }}>
      <div style={{display:'inline-block',padding:20}}>
        <div onClick={activeTabTrigger} style={{
          display:'inline-block',
          padding:10,
          backgroundColor:activeTab == 'repositories' ? '#0969da' : '#f6f8fa',
          color:activeTab == 'repositories' ? '#fff' : '#000',
          cursor:'pointer'
        }}>Repositories</div>
        <div onClick={activeTabTrigger} style={{
          display:'inline-block',
          padding:10,
          backgroundColor:activeTab == 'developers' ? '#0969da' : '#f6f8fa',
          color:activeTab == 'developers' ? '#fff' : '#000',
          cursor:'pointer'
        }}>Devlopers</div>
      </div>
    </div>
  );
}
function Contents(props) {
  if(props.activeTab == 'repositories'){
    return (<div style={{width:'90%',margin:'0 auto',border:'1px solid #d8dee4'}}>
      {props.data.map((value, index) => (
        <div key={index}>
          <div style={{padding:20}}>
            <a href={value.url} style={{color:'#0969da',textDecoration: 'none'}}>
              <h2>{value.username} / <b>{value.repositoryName}</b></h2>
            </a>
            <p style={{color:'#57606a'}}>{value.description}</p>
            <div style={{marginTop:10,marginBottom:10,fontSize:12,color:'#57606a'}}>
              {value.language}<span style={{paddingLeft:20}}></span>
              {value.totalStars}<span style={{paddingLeft:20}}></span>
              {value.forks}<span style={{paddingLeft:20}}></span>
              Built by <BuiltBy data={value.builtBy}/>
              <span style={{float:'right'}}>{value.starsSince} stars today</span>
            </div>
          </div>
          <hr style={{color:'#d8dee4',border:0,height:1,backgroundColor:'#d8dee4'}} />
        </div>
      ))}
      </div>);
  }else{
    if(props.data[0].popularRepository === undefined){
      return(<div></div>);
    }else{
      return (<div style={{width:'90%',margin:'0 auto',border:'1px solid #d8dee4'}}>
        {props.data.map((value, index) => (
        <div key={index}>
          <div style={{padding:20}}>
            <div style={{width:'33%',display:'inline-block'}}>
              <div
                style={{
                  display:'inline-block',
                  marginRight:20,
                  fontSize:12,
                  color:'#57606a',
                  verticalAlign:'top'
                }}
                >
                {value.rank}
              </div>
              <img
                style={{width:48,borderRadius:'50%',display:'inline-bolck',marginRight:20,verticalAlign:'top'}}
                src={value.avatar}
              />
              <p style={{display:'inline-block',marginTop:0,verticalAlign:'top'}}>
                <a
                href={value.url}
                style={{color:'#0969da',textDecoration: 'none'}}
                >
                <b>{value.name}</b>
                </a>
                <br />{value.username}
              </p>
            </div>
            <div style={{display:'inline-block',width:'33%',verticalAlign:'top'}}>
                <p style={{margin:0,fontSize:12,color:'#57606a'}}>POPULAR REPO</p>
                <p style={{margin:0}}>
                  <a
                    href={value.popularRepository.url}
                    style={{color:'#0969da',textDecoration: 'none'}}
                  >
                  <b>{value.popularRepository.repositoryName}</b>
                  </a>
                </p>
                <p style={{margin:0,fontSize:12,color:'#57606a'}}>{value.popularRepository.description}</p>
            </div>
          </div>
          <hr style={{color:'#d8dee4',border:0,height:1,backgroundColor:'#d8dee4'}} />
        </div>
        ))}
        </div>);
    }
  }
}
function BuiltBy(props){
  if(props.data !== undefined){
    return (<div style={{display:'inline-block'}}>
      {props.data.map((value, index) => (
        <a  key={index} href={value.url}>
          <img
            src={value.avatar}
            style={{borderRadius:'50%',width:20,marginRight:2}}
          />
        </a>
      ))}
      </div>);
  }else{
    return(<div></div>);
  }
}
function App() {
  const [feedData, setFeedData] = useState([]);
  const [activeTab, setActiveTab] = useState('repositories');

   useEffect(() => {
     //to solve CORS issue ... using my site to retirve data
     let apiCall = new XMLHttpRequest();
     apiCall.onreadystatechange = (e) => {
       if (apiCall.readyState !== 4) {
         return;
       }
     if(apiCall.status === 200){
       setFeedData(JSON.parse(apiCall.responseText));
     }else{
       console.log("failed");
     }};
     apiCall.open('POST', 'http://rustamlab.com/projects/coinMena/coinTask.php');
     apiCall.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     apiCall.send('key=nE7D9NbhJguKf7tRNqngan7Y2SbJ&type='+activeTab);
   }, [setFeedData, activeTab]);

   const navigateTrigger = () => {
     if(activeTab == "repositories"){
       setActiveTab('developers');
     }else{
       setActiveTab('repositories');
     }
   }

  return (
    <div style={{backgroundColor:'#fff'/*'#0c0d14'*/,paddingTop:25}}>
        <h1 style={{textAlign:'center'}}>Trending</h1>
        <h4 style={{textAlign:'center',color:'#57606a',marginBottom:50}}>
          see what github community is most existed today
        </h4>
        <Header activeTab={activeTab} navigate={()=>navigateTrigger()}/>
        <Contents data={feedData} activeTab={activeTab}/>
    </div>
  );
}

export default App;
