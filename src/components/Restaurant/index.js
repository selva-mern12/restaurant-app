import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import TableMenuList from '../TableMenuList'
import ItemList from '../ItemList'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Restaurant extends Component {
  state = {
    restaurantDetails: {},
    tableMenu: '',
    restaurantPageStatus: pageStatus.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({restaurantPageStatus: pageStatus.loading})
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    if (response.ok) {
      const data = await response.json()
      const restaurant = data[0]
      const restaurantUpdatedData = {
        restaurantId: restaurant.restaurant_id,
        restaurantName: restaurant.restaurant_name,
        restaurantImage: restaurant.restaurant_image,
        tableId: restaurant.table_id,
        tableName: restaurant.table_name,
        branchName: restaurant.branch_name,
        nextUrl: restaurant.nexturl,
        tableMenuList: restaurant.table_menu_list.map(item => ({
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          menuCategory_image: item.menu_category_image,
          nextUrl: item.nexturl,
          categoryDishes: item.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            dishImage: dish.dish_image,
            dishCurrency: dish.dish_currency,
            dishCalories: dish.dish_calories,
            dishDescription: dish.dish_description,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            nextUrl: dish.nexturl,
            addonCat: dish.addonCat.map(addOnCat => ({
              addonCategory: addOnCat.addon_category,
              addonCategory_id: addOnCat.addon_category_id,
              addonSelection: addOnCat.addon_selection,
              nextUrl: addOnCat.nexturl,
              addOns: addOnCat.addons.map(addOn => ({
                dishId: addOn.dish_id,
                dishName: addOn.dish_name,
                dishPrice: addOn.dish_price,
                dishImage: addOn.dish_image,
                dishCurrency: addOn.dish_currency,
                dishCalories: addOn.dish_calories,
                dishDescription: addOn.dish_description,
                dishAvailability: addOn.dish_Availability,
                dishType: addOn.dish_Type,
              })),
            })),
          })),
        })),
      }
      this.setState({
        restaurantDetails: restaurantUpdatedData,
        tableMenu: restaurantUpdatedData.tableMenuList[0].menuCategory,
        restaurantPageStatus: pageStatus.success,
      })
    } else {
      this.setState({restaurantPageStatus: pageStatus.failure})
    }
  }

  selectTableMenu = table => this.setState({tableMenu: table})

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }
    const {restaurantDetails, tableMenu, restaurantPageStatus} = this.state
    const itemList = restaurantDetails?.tableMenuList?.find(
      item => item.menuCategory === tableMenu,
    )?.categoryDishes
    console.log(restaurantDetails)
    return (
      <div>
        <div className="fixed-container">
          <Header />
          <TableMenuList
            tableList={restaurantDetails.tableMenuList}
            tableMenu={tableMenu}
            selectTableMenu={this.selectTableMenu}
            restaurantPageStatus={restaurantPageStatus}
          />
        </div>
        <ul>
          {itemList?.map(item => (
            <ItemList key={item.dishId} tableDetails={item} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Restaurant
