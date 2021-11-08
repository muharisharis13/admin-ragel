import React from 'react'
import { ApproveTakeAtOffice } from '../approve/approve'
import { Finish } from '../finish/finish'
import { Orders } from '../orders/Orders'
import Pending from '../pending/pending'
import { Rejected } from '../rejected/rejected'
import './navtab.css'


export const Navtabs = () => {
  return (
    <div>
      <ul class="nav nav-pills mb-3 navtabsorder" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active btnOrder" id="pills-pending-tab" data-bs-toggle="pill" data-bs-target="#pills-pending" type="button" role="tab" aria-controls="pills-pending" aria-selected="true">Pending</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link  btnOrder" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Paid</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Rejected</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#approved" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Approved</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#finish" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Finish</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab">
          {/* <Orders /> */}
          <Pending />
        </div>
        <div class="tab-pane fade  " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <Orders />
        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <Rejected />
        </div>
        <div class="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="pills-contact-tab">
          <ApproveTakeAtOffice />
        </div>
        <div class="tab-pane fade" id="finish" role="tabpanel" aria-labelledby="pills-contact-tab">
          <Finish />
        </div>
      </div>
    </div>
  )
}
