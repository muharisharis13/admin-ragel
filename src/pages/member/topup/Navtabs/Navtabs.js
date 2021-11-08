import React from 'react'
import { TopUpHistory } from '../topupHistory/TopUpHistory'
import { TopupList } from '../topupList/TopupList'

export const Navtabs = () => {
  return (
    <div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12 col-sm-12 col-lg-7">
          <ul class="nav nav-pills mb-3 navtabsorder" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active btnOrder" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Top Up List</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btnOrder" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#finish" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Top Up History</button>
            </li>
          </ul>

        </div>
      </div>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <TopupList />
        </div>
        <div class="tab-pane fade" id="finish" role="tabpanel" aria-labelledby="pills-contact-tab">
          <TopUpHistory />
        </div>
      </div>
    </div>
  )
}
