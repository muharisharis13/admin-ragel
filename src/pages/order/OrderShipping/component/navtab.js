import React from 'react'
import { Finish } from '../finish/finish'
import { Orders } from '../orders/Orders'
import { Rejected } from '../rejected/rejected'
import { Shipping } from '../shipping/shipping'
import './navtab.css'

export const Navtabs = () => {
  return (
    <div>
      <ul class="nav nav-pills mb-3 navtabsorder" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active btnOrder" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Order</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Shipping</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Rejected</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#finish" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Finish</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <Orders />
        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Shipping />
        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <Rejected />
        </div>
        <div class="tab-pane fade" id="finish" role="tabpanel" aria-labelledby="pills-contact-tab">
          <Finish />
        </div>
      </div>
    </div>
  )
}
