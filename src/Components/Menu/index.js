import React, { Component } from "react";
import {
  Container,
  NavContainer,
  Link,
  NavLink,
  DropDownBtn,
  DropDownLink,
  DropDownContent,
  SubLink,
} from "../../Styles";

class Menu extends Component {
  handleClick = (action) => {
    if (!action) return;

    if (this.props.onClick) this.props.onClick(action);
  };

  render = () => {
    return (
      <Container>
        <NavContainer>
          <NavLink>
            <Link onClick={() => this.handleClick("Home")}>Software</Link>
          </NavLink>
          <DropDownLink>
            <DropDownBtn onClick={() => this.handleClick("Products")}>
              Products
            </DropDownBtn>
            <DropDownContent>
              {" "}
              <SubLink onClick={() => this.handleClick("Link1")}>
                Link 1
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link2")}>
                Link 2
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link3")}>
                Link 3
              </SubLink>
            </DropDownContent>
          </DropDownLink>
          <DropDownLink>
            <DropDownBtn onClick={() => this.handleClick("Technology")}>
              Technology
            </DropDownBtn>
            <DropDownContent>
              {" "}
              <SubLink onClick={() => this.handleClick("Link1")}>
                Link 1
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link2")}>
                Link 2
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link3")}>
                Link 3
              </SubLink>
            </DropDownContent>
          </DropDownLink>
          <NavLink>
            <Link onClick={() => this.handleClick("News")}>Testimonials</Link>
          </NavLink>
          <DropDownLink>
            <DropDownBtn onClick={() => this.handleClick("Resources")}>
              Resources
            </DropDownBtn>
            <DropDownContent>
              {" "}
              <SubLink onClick={() => this.handleClick("Link1")}>
                Resources & Blog
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link2")}>
                Case Studies
              </SubLink>
            </DropDownContent>
          </DropDownLink>
          <DropDownLink>
            <DropDownBtn onClick={() => this.handleClick("About")}>
              About
            </DropDownBtn>
            <DropDownContent>
              {" "}
              <SubLink onClick={() => this.handleClick("Link1")}>
                Company
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link2")}>
                Events
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link3")}>FAQ</SubLink>
              <SubLink onClick={() => this.handleClick("Link3")}>
                Partners
              </SubLink>
              <SubLink onClick={() => this.handleClick("Link3")}>
                Careers
              </SubLink>
            </DropDownContent>
          </DropDownLink>
          <NavLink>
            <Link onClick={() => this.handleClick("News")}>Contact</Link>
          </NavLink>
          <NavLink>
            <Link onClick={() => this.handleClick("News")}>Support</Link>
          </NavLink>
        </NavContainer>
      </Container>
    );
  };
}

export default Menu;
