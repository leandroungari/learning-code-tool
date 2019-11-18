import React, {
  useEffect, 
  useCallback,
  useState
} from "react";

import {
  Header
} from "../../components";

import {
  useLocation
} from "react-router-dom";

import {
  parseDiff, 
  Diff, 
  Hunk
} from 'react-diff-view';

function Viewer() {

  const location = useLocation();

  const [ files, setFiles ] = useState([]);

  const {
    commit
  } = location.state;

  useEffect(() => {
    document.title = "Learning Code Tool";
  }, []);

  const renderFile = useCallback(({oldRevision, newRevision, type, hunks}) => {
    return (
      <Diff 
        key={oldRevision + '-' + newRevision} 
        viewType="split" 
        diffType={type} 
        hunks={hunks}
      >
        {
          hunks => hunks.map(
            hunk => <Hunk key={hunk.content} hunk={hunk} />
          )
        }
      </Diff>
    );
  }, []);

  return(
    <>
      <Header />
      { files.map(renderFile) }
    </>
  );
}

export default Viewer;