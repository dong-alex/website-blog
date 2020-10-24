import React, { FunctionComponent } from "react"

interface LayoutProps {
  title: string
}

const Layout: FunctionComponent<LayoutProps> = ({ title, children }) => {
  return (
    <div className="global-wrapper">
      <main>{children}</main>
    </div>
  )
}

export default Layout
