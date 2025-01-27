import {useState, useEffect} from 'react'

const Sample = () => {
  const [restaurantDetails, setRataurant] = useState({})

  useEffect(() => {
    const getRestaurantDetails = async () => {
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

        setRataurant(restaurantUpdatedData.tableMenuList[0].menuCategory)
      }
    }

    getRestaurantDetails()
  }, [])

  console.log(restaurantDetails)

  return <h1>Selva</h1>
}

export default Sample
