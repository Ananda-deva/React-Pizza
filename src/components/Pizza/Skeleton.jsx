import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPizza = (props) => (
  <ContentLoader 
    speed={2}
    width={260}
    height={465}
    viewBox="0 0 260 465"
    backgroundColor="#d6d6d6"
    foregroundColor="#cbc3c3"
    {...props}
  >
    <circle cx="129" cy="116" r="100" /> 
    <rect x="0" y="227" rx="10" ry="10" width="260" height="25" /> 
    <rect x="1" y="267" rx="10" ry="10" width="260" height="90" /> 
    <rect x="2" y="381" rx="11" ry="11" width="90" height="30" /> 
    <rect x="110" y="373" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
)

export default SkeletonPizza