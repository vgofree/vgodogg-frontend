import React, { Component } from 'react'
import '../styles/Inventory.css'
import ItemCard from '../components/ItemCard'
import {LazyLoadComponent, LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import utils from '../libs/utils'
import { Spinner } from '@blueprintjs/core'
import CountUp from 'react-countup';
import {sumBy} from 'lodash'

class Inventory extends Component {

  constructor(props) {
    super()

    this.state = {
      items: []
    }

    // setInterval(this.getMyInventory.bind(this), 10000)
  }

  componentDidMount() {
    this.getMyInventory.bind(this)()
  }

  getMyInventory() {
    return this.props.callAction('getMyInventory', {
      appid: 1
    }).then(response => this.setState({items: response.items}))
  }

  render() {
    return (
      <div className="Inventory-wrapper">
        {
          this.state.items.length > 0 ? 
          <h1>Current Inventory Value: <CountUp 
            prefix="$" 
            separator="," 
            decimals={2} 
            end={sumBy(this.state.items, 'suggested_price')/100} 
          /></h1> :
          <h1>You have no items!</h1>
        }
        <div className="Inventory-items">
          {
            this.state.items.map(item => {
              item = utils.processItem(item)
              return (
                <LazyLoadComponent key={item.id}>
                  <ItemCard 
                    key={item.id}
                    {...item}
                  />
                </LazyLoadComponent>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Inventory
