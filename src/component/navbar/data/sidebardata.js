import React from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import Home from '../../../image/icon/home.png'
import Bar from '../../../image/icon/bar-chart-2.png'
import Product from '../../../image/icon/sidebar/package.png'
import Package from '../../../image/icon/package.png'
import Calender from '../../../image/icon/calendar.png'
import Order from '../../../image/icon/grid.png'
import Setting from '../../../image/icon/settings.png'
import User from '../../../image/icon/user.png'
import Pencil from '../../../image/icon/outline-create-24px.png'


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: Home
  },
  {
    title: 'Payment Gate',
    path: '/payment',
    icon: Order
  },
  {
    title: 'Shipping',
    path: '/shipping',
    icon: Order
  },
  {
    title: 'Order',
    path: '#',
    icon: Order,
    iconClosed: <FaCaretDown />,
    iconOpened: <FaCaretUp />,
    subNav: [

      // {
      //   title: 'Shipping Order',
      //   path: '/order'
      // },
      {
        title: 'Order Take Office',
        path: '/orderManual'
      },

    ]
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: Bar
  },
  {
    title: 'product',
    path: '/product',
    icon: Product
  },
  {
    title: 'Event',
    path: '/event',
    icon: Calender
  },
  {
    title: 'Admin',
    path: '/signup',
    icon: User
  },
  {
    title: 'Member',
    path: '#',
    icon: User,
    iconClosed: <FaCaretDown />,
    iconOpened: <FaCaretUp />,
    subNav: [

      {
        title: 'Member List',
        path: '/member'
      },
      {
        title: 'Member Topup',
        path: '/memberTopup'
      },
      {
        title: 'Member Request',
        path: '/members/request'
      },

    ]
  },

  {
    title: 'Blog',
    path: '/blog',
    icon: Pencil
  },
  // {
  //   title: 'Setting',
  //   path: '/setting',
  //   icon: Setting
  // },
  {
    title: 'Setting',
    path: '#',
    icon: Setting,
    iconClosed: <FaCaretDown />,
    iconOpened: <FaCaretUp />,
    subNav: [

      {
        title: 'Change Username',
        path: '/settings/auth'
      },
      {
        title: 'Info',
        path: '/settings/Info'
      },

    ]
  }
]