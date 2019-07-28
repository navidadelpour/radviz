export const _handleChange = ({name, value, checked}, previousState, setState = null) => {
  value = value || checked
  let newState = {
    ...previousState,
    [name]: value
  }
  setState(newState)
}

export const transformResponseToNeededData = (response) => {
  const result = {
    data: [],
    dimensions: [],
    classLabel: "",
    clusterLabel: ""
  }

  result.dimensions   = response["dimensions"]
  result.classLabel   = "class"
  result.clusterLabel = "cluster" 
  result.correlationMatrix = response["correlation_matrix"]

  response["data"].forEach((values, sampleIndex) => {
    let sample = {}
    values.forEach((value, attributeIndex) => {
      sample[result.dimensions[attributeIndex]] = value
    });
    sample[result.classLabel] = response["classNames"][response["classes"][sampleIndex]]
    if(response["clusters"])
      sample[result.clusterLabel] = response["clusters"][sampleIndex]

    result.data.push(sample)
  });
  return result
}

