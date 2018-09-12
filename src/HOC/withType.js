import React from "react";

export default function withType (WrappedComponent, type) {
  return props => {
    return <WrappedComponent {...props} datatype={type} />
  }
}