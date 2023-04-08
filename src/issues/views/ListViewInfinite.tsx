import { useState } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues, useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const {issuesQuery} = useIssuesInfinite({state,labels:selectedLabels});


  const onLabelChange = (labelName:string) => {
    (selectedLabels.includes(labelName))
    ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
    : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? <LoadingIcon />
            : <IssueList 
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChange={ (newState)=> setState(newState) }
              />
        }

        <button 
        disabled={!issuesQuery.hasNextPage}
        onClick={()=> issuesQuery.fetchNextPage() }
        className='btn btn-outline-primary mt-2'>
          Load More...
        </button>


      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels = {selectedLabels}
          onChange = {(labelName)=>onLabelChange(labelName) }
        />
      </div>
    </div>
  )
}
