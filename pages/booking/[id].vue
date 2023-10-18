<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="postbox__category">
              <NuxtLink
                :to="{
                  path: '/sample-submission',
                }"
                style="padding: 10px"
              >
                {{ $t("Sample Submission") }}
              </NuxtLink>
            </div>

            <div class="breadcrumb__list">
              <span class="breadcrumb-item-1">
                <NuxtLink
                  :to="{
                    path: '/',
                  }"
                >
                  {{ $t("Home") }}
                </NuxtLink>
              </span>
              <span class="dvdr breadcrumb-item-1"
                ><i class="fa-solid fa-circle-small"></i
              ></span>
              <span class="breadcrumb-item-1">
                <NuxtLink href="/equipment-and-rate">
                  {{ $t("Sample Submission") }}</NuxtLink
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
  <section class="postbox__area pt-40 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="postbox__wrapper" v-if="item">
            <!-- Image -->
            <!-- <div class="postbox__top">
            </div> -->
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div class="postbox__details-content-wrapper">
                      <!-- <h3>{{ item.equipment_department.name }}</h3> -->
                      <h3>{{ item.title_en }}</h3>
                      <h3>{{ item.title_th }}</h3>
                    </div>

                    <div class="mt-30 pl-10 pt-15 pb-10 bg-grey">
                      <h4>
                        <i class="fa-solid fa-microscope"></i>
                        <span class="ml-10">{{ $t("Booking") }}</span>
                      </h4>
                    </div>

                    <div class="postbox__details-content-wrapper mt-20 row">
                      <div class="col-xxl-12 col-xl-12 col-lg-12">
                        <div>
                          <!--  -->
                          <nav>
                            <div
                              class="nav nav-tabs"
                              id="nav-tab"
                              role="tablist"
                            >
                              <button
                                class="nav-link active"
                                id="nav-method-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-method"
                                type="button"
                                role="tab"
                                aria-controls="nav-method"
                                aria-selected="true"
                              >
                                {{ $t("Method Lists") }}
                              </button>
                              <button
                                class="nav-link"
                                id="nav-billing-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-billing"
                                type="button"
                                role="tab"
                                aria-controls="nav-billing"
                                aria-selected="false"
                              >
                                {{ $t("Billing") }}
                              </button>
                              <button
                                class="nav-link"
                                id="nav-summary-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-summary"
                                type="button"
                                role="tab"
                                aria-controls="nav-summary"
                                aria-selected="false"
                                @click="onCheckSummary()"
                              >
                                {{ $t("Summary") }}
                              </button>
                            </div>
                          </nav>
                          <div class="tab-content" id="nav-tabContent">
                            <div
                              class="tab-pane fade show active pt-20"
                              id="nav-method"
                              role="tabpanel"
                              aria-labelledby="nav-method-tab"
                            >
                              <!--  -->
                              <div class="card" style="border: none">
                                <!-- <div class="card-header">Featured</div> -->
                                <div class="card-body">
                                  <div class="form-group row">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >ระบุวันที่/Date :
                                    </label>
                                    <div class="col-sm-9">
                                      <VueDatePicker
                                        v-model="booking.booking_date"
                                        :enable-time-picker="false"
                                        :locale="
                                          useCookie('lang').value == 'en'
                                            ? 'en'
                                            : 'th'
                                        "
                                        auto-apply
                                        :format="format"
                                      >
                                        <template
                                          #year-overlay-value="{ text }"
                                        >
                                          {{
                                            useCookie("lang").value == "en"
                                              ? text
                                              : parseInt(text) + 543
                                          }}
                                        </template>

                                        <template #year="{ value }">
                                          {{
                                            useCookie("lang").value == "en"
                                              ? value
                                              : value + 543
                                          }}
                                        </template>
                                      </VueDatePicker>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >เลือกช่วงเวลา/Period Time :
                                    </label>
                                    <div class="col-sm-9">
                                      <v-select
                                        :label="
                                          useCookie('lang') == 'en'
                                            ? 'name_en'
                                            : 'name_th'
                                        "
                                        placeholder="ช่วงเวลา/Period Time"
                                        :options="selectOptions.period_times"
                                        id="slt-period_time"
                                        v-model="booking.period_time"
                                        class="form-control v-select-no-border"
                                        :clearable="true"
                                      ></v-select>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >ข้อมูลตัวอย่าง/Example :
                                    </label>
                                    <div class="col-sm-9">
                                      <textarea
                                        class="form-control"
                                        placeholder="ข้อมูลตัวอย่างที่นำมาวิเคราะห์"
                                        id="txt-example"
                                        style="height: 100px"
                                        v-model="booking.example"
                                      ></textarea>
                                    </div>
                                  </div>

                                  <hr />

                                  <h5 class="card-title">
                                    {{ $t("Method Lists") }} :
                                  </h5>

                                  <div
                                    class="table-responsive"
                                    v-if="equipmentMethod.length != 0"
                                  >
                                    <table
                                      class="table table-responsive table-bordered mt-20 table-method"
                                    >
                                      <thead>
                                        <tr>
                                          <th
                                            class="text-center"
                                            style="width: 50px"
                                          >
                                            {{ $t("Choose") }}
                                          </th>
                                          <th>{{ $t("Lists") }}</th>
                                          <th class="text-center">
                                            {{ $t("Method") }}
                                          </th>
                                          <th
                                            class="text-center"
                                            style="width: 100px"
                                          >
                                            {{ $t("Quantity") }}
                                          </th>
                                          <th
                                            class="text-center"
                                            style="width: 100px"
                                          >
                                            {{ $t("Unit") }}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr
                                          v-for="(it, index) in equipmentMethod"
                                          :key="index"
                                        >
                                          <td class="text-center">
                                            <input
                                              class="form-check-input"
                                              type="checkbox"
                                              :id="
                                                'equipment-method-no-' + it.id
                                              "
                                              :checked="false"
                                              @click="
                                                onSelectMethod(
                                                  it,
                                                  $event.target.checked
                                                )
                                              "
                                            />
                                          </td>
                                          <td>{{ it.name }}</td>
                                          <td class="text-center">
                                            {{ it.name_short }}
                                          </td>
                                          <td class="text-center">
                                            <input
                                              type="number"
                                              :id="
                                                'equipment-method-quantity-' +
                                                it.id
                                              "
                                              disabled="true"
                                              class="form-control text-quantity"
                                              value="0"
                                              min="0"
                                              @change="
                                                onChangeQuantity(
                                                  it.id,
                                                  $event.target.value
                                                )
                                              "
                                            />
                                          </td>
                                          <td class="text-center">
                                            {{ it.unit }}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <!-- <div class="mt-30 text-center">
                                <div class="div-btn-sample-submission">
                                  <div class="col">
                                    <div class="tp-button-demo text-center">
                                      <NuxtLink
                                        to="/sample-submission"
                                        class="tp-btn-border-brown text-uppercase"
                                        >{{ $t("Next") }}</NuxtLink
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div> -->
                              <!--  -->
                            </div>
                            <div
                              class="tab-pane fade"
                              id="nav-billing"
                              role="tabpanel"
                              aria-labelledby="nav-billing-tab"
                            >
                              <!--  -->
                              <div class="card" style="border: none">
                                <div class="card-body">
                                  <div class="form-group row">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >ชื่อ-นามสกุล/Name Surname :
                                    </label>
                                    <div class="col-sm-9">
                                      <div class="row">
                                        <div class="col-md-2">
                                          <input
                                            type="text"
                                            class="form-control form-control-plaintext"
                                            id="txt-prefix"
                                            v-model="booking.prefix"
                                            placeholder="คำนำหน้า"
                                          />
                                        </div>
                                        <div class="col-md-5">
                                          <input
                                            type="text"
                                            class="form-control form-control-plaintext"
                                            id="txt-firstname"
                                            v-model="booking.firstname"
                                            placeholder="ชื่อ"
                                          />
                                        </div>
                                        <div class="col-md-5">
                                          <input
                                            type="text"
                                            class="form-control form-control-plaintext"
                                            id="txt-surname"
                                            v-model="booking.surname"
                                            placeholder="นามสกุล"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >สถานะ/Member Status :
                                    </label>
                                    <div class="col-sm-9">
                                      <v-select
                                        :label="
                                          useCookie('lang') == 'en'
                                            ? 'name_en'
                                            : 'name_th'
                                        "
                                        placeholder="สถานะ/Member Status"
                                        :options="selectOptions.member_statuses"
                                        id="slt-member-status"
                                        v-model="booking.member_status"
                                        class="form-control v-select-no-border"
                                        :clearable="true"
                                      ></v-select>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-4 col-form-label"
                                      >ชื่อหน่วยงาน/Organization :
                                    </label>
                                    <div class="col-sm-8">
                                      <input
                                        type="text"
                                        class="form-control form-control-plaintext"
                                        id="txt-organization"
                                        v-model="booking.organization"
                                      />
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-4 col-form-label"
                                      >ที่อยู่ที่สามารถติดต่อได้/Contact Address
                                      :
                                    </label>
                                    <div class="col-sm-8">
                                      <textarea
                                        class="form-control"
                                        placeholder=""
                                        id="txt-contact-address"
                                        style="height: 70px"
                                        v-model="booking.contact_address"
                                      ></textarea>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >โทรศัพท์/Phone :
                                    </label>
                                    <div class="col-sm-9">
                                      <input
                                        type="text"
                                        class="form-control form-control-plaintext"
                                        id="txt-phone"
                                        v-model="booking.phone"
                                      />
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >E-mail :
                                    </label>
                                    <div class="col-sm-9">
                                      <input
                                        type="text"
                                        class="form-control form-control-plaintext"
                                        id="txt-email"
                                        v-model="booking.email"
                                      />
                                    </div>
                                  </div>

                                  <hr />

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-4 col-form-label"
                                      >ที่อยู่ในการออกใบกำกับภาษี/ Invoice
                                      Address :
                                    </label>
                                    <div class="col-sm-8">
                                      <textarea
                                        class="form-control"
                                        placeholder=""
                                        id="txt-invoice-address"
                                        style="height: 70px"
                                        v-model="booking.invoice_address"
                                      ></textarea>
                                    </div>
                                  </div>

                                  <div class="form-group row mt-10">
                                    <label
                                      for="staticEmail"
                                      class="col-sm-3 col-form-label"
                                      >เลขประจำตัวผู้เสียภาษี/Tax ID :
                                    </label>
                                    <div class="col-sm-9">
                                      <input
                                        type="text"
                                        class="form-control form-control-plaintext"
                                        id="txtTaxID"
                                        v-model="booking.tax_id"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- <div class="mt-30 text-center">
                                <div class="div-btn-sample-submission">
                                  <div class="col">
                                    <div class="tp-button-demo text-center">
                                       <NuxtLink
                                        to="/sample-submission"
                                        class="tp-btn-border-brown text-uppercase mr-10"
                                        >{{ $t("Back") }}</NuxtLink
                                      >
                                      <NuxtLink
                                        to="/sample-submission"
                                        class="tp-btn-border-brown text-uppercase"
                                        >{{ $t("Next") }}</NuxtLink
                                      > 
                                    </div>
                                  </div>
                                </div>
                              </div> -->
                              <!--  -->
                            </div>
                            <div
                              class="tab-pane fade"
                              id="nav-summary"
                              role="tabpanel"
                              aria-labelledby="nav-summary-tab"
                            >
                              <!--  -->
                              <div v-if="checkSummary == true">
                                <div class="card" style="border: none">
                                  <div class="card-body row">
                                    <div class="col-lg-12">
                                      <span class="fw-bold"
                                        >เครื่องมือ/Scientific Instrument : </span
                                      ><span class="fst-italic">{{
                                        item.title
                                      }}</span>

                                      <hr class="hr-dotted" />
                                    </div>
                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold"
                                        >วันที่จอง/Booking Date : </span
                                      ><span class="fst-italic">{{
                                        dayjs(booking.booking_date).format(
                                          "DD/MM/YYYY"
                                        )
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold"
                                        >ข้อมูลตัวอย่าง/Example : </span
                                      ><span class="fst-italic">{{
                                        booking.example
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-12 mt-10">
                                      <span class="fw-bold"
                                        >รายการวิเคราะห์/Method List :
                                      </span>
                                      <br />

                                      <div class="mt-20">
                                        <div
                                          class="row"
                                          v-for="(
                                            it, index
                                          ) in booking.equipment_method"
                                          :key="index"
                                        >
                                          <div class="col-lg-6 col-md-6">
                                            <span
                                              :style="
                                                index === 0
                                                  ? 'padding-right: 12px'
                                                  : 'padding-right: 8px'
                                              "
                                              >{{ index + 1 }}.</span
                                            >
                                            <span>{{
                                              it.name + " " + it.name_short
                                            }}</span>
                                          </div>
                                          <div class="col-lg-3 col-md-3 col-6">
                                            <span
                                              >{{ $t("Quantity") }}
                                              {{ it.quantity }}
                                              {{ it.unit }}</span
                                            >
                                          </div>
                                          <div class="col-lg-3 col-md-3 col-6">
                                            <span>
                                              {{ $t("Price") }}
                                              {{ it.total_price }}.00

                                              {{ $t("Bath") }}</span
                                            >
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <h4
                                          class="fw-bold text-center mt-20 text-success"
                                        >
                                          {{ $t("Total Price") }}
                                          {{ booking.total_price }}.00
                                          {{ $t("Bath") }}
                                        </h4>
                                      </div>

                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold"
                                        >ชื่อ-นามสกุล/Name Surname : </span
                                      ><span class="fst-italic">{{
                                        booking.prefix +
                                        booking.firstname +
                                        " " +
                                        booking.surname
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold"
                                        >สถานะ/Member Status : </span
                                      ><span class="fst-italic">
                                        {{ booking.member_status.name_th }}
                                      </span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-12 mt-10">
                                      <span class="fw-bold"
                                        >ชื่อหน่วยงาน/Organization : </span
                                      ><span class="fst-italic">{{
                                        booking.organization
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-12 mt-10">
                                      <span class="fw-bold"
                                        >ที่อยู่ที่สามารถติดต่อได้/Contact
                                        Address : </span
                                      ><span class="fst-italic">{{
                                        booking.contact_address
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold"
                                        >โทรศัพท์/Phone :</span
                                      ><span class="fst-italic">{{
                                        booking.phone
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-6 mt-10">
                                      <span class="fw-bold">E-mail : </span
                                      ><span class="fst-italic">{{
                                        booking.email
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-12 mt-10">
                                      <span class="fw-bold"
                                        >เลขประจำตัวผู้เสียภาษี/Tax ID : </span
                                      ><span class="fst-italic">{{
                                        booking.tax_id
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>

                                    <div class="col-lg-12 mt-10">
                                      <span class="fw-bold"
                                        >ที่อยู่ในการออกใบกำกับภาษี/ Invoice
                                        Address : </span
                                      ><span class="fst-italic">{{
                                        booking.invoice_address
                                      }}</span>
                                      <hr class="hr-dotted" />
                                    </div>
                                  </div>
                                </div>

                                <div class="mt-30 text-center">
                                  <div class="div-btn-sample-submission">
                                    <div class="col">
                                      <div class="tp-button-demo text-center">
                                        <button
                                          class="tp-btn-border-brown text-uppercase"
                                          @click="onConfirmSubmit()"
                                        >
                                          {{ $t("Submit Order") }}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div v-else>
                                <h2 class="text-center mt-50 text-danger">
                                  {{ text_summary_error }}
                                </h2>
                              </div>
                              <!--  -->
                            </div>
                          </div>

                          <!--  -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import booking_data from "~~/mixins/bookingData";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const item = ref(null);
const booking = ref({
  booking_date: dayjs(),
  example: "",
  equipment_method: [],
  prefix: "",
  firstname: "",
  surname: "",
  member_status: null,
  period_time: null,
  organization: "",
  contact_address: "",
  phone: "",
  email: "",
  invoice_address: "",
  tax_id: "",
  total_price: 0,
  status_id: 1,
  is_publish: 1,
});
const equipmentMethod = ref([]);
const checkSummary = ref(false);
const text_summary_error = ref("โปรดระบุข้อมูลให้ครบถ้วน");

const selectOptions = ref({
  member_statuses: booking_data.data().member_statuses,
  period_times: booking_data.data().period_times,
});

const format = (date) => {
  if (useCookie("lang").value == "th") {
    const day = dayjs(date).locale("th").format("DD");
    const month = dayjs(date).locale("th").format("MMM");
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  } else {
    const day = dayjs(date).format("DD");
    const month = dayjs(date).format("MMM");
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
};

// Fetch

// Function Fetch
const { data: resEquipmentMethod } = await useAsyncData(
  "equipmentMethod",
  async () => {
    let data = await $fetch(
      `${runtimeConfig.public.apiBase}/equipment-method`,
      {
        params: {
          is_publish: 1,
          equipment_id: route.params.id,
          lang: useCookie("lang").value,
        },
      }
    );

    return data;
  }
);

equipmentMethod.value = resEquipmentMethod.value.data;

const { data: res } = await useAsyncData("equipment", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/equipment/${route.params.id}`,
    {
      params: {
        lang: useCookie("lang").value,
      },
    }
  );

  return data;
});

item.value = res.value.data;

// Method
const onSelectMethod = (it, event) => {
  if (event == true) {
    let quantity_input = document.getElementById(
      "equipment-method-quantity-" + it.id
    );
    quantity_input.removeAttribute("disabled");

    booking.value.equipment_method.push({
      id: it.id,
      name: it.name,
      name_short: it.name_short,
      is_fixrate: it.is_fixrate,
      pricing: it.pricing,
      unit: it.unit,
      quantity: 0,
    });
  } else {
    let quantity_input = document.getElementById(
      "equipment-method-quantity-" + it.id
    );
    quantity_input.value = 0;
    quantity_input.setAttribute("disabled", true);

    let filtered = booking.value.equipment_method.filter((x) => {
      return x.id != it.id;
    });

    booking.value.equipment_method = filtered;
  }
};

const onChangeQuantity = (id, event) => {
  booking.value.equipment_method = booking.value.equipment_method.map((x) => {
    if (x.id == id) {
      x.quantity = parseInt(event);
    }
    return x;
  });
};

const onCheckSummary = () => {
  if (booking.value.equipment_method.length == 0) {
    checkSummary.value = false;
    text_summary_error.value = "โปรดเลือกรายการวิเคราะห์";
    return;
  }

  let checkQuantity = booking.value.equipment_method.find((x) => {
    return x.quantity == 0;
  });

  if (checkQuantity) {
    checkSummary.value = false;
    text_summary_error.value = "โปรดเลือกจำนวนรายการวิเคราะห์";
    return;
  }

  if (
    booking.value.booking_date == "" ||
    booking.value.booking_date == null ||
    // ||
    // booking.value.prefix == "" ||
    // booking.value.prefix == null ||
    // booking.value.firstname == "" ||
    // booking.value.firstname == null ||
    // booking.value.surname == "" ||
    // booking.value.surname == null ||
    booking.value.member_status == "" ||
    booking.value.member_status == null
    // ||
    // booking.value.organization == "" ||
    // booking.value.organization == null ||
    // booking.value.contact_address == "" ||
    // booking.value.contact_address == null ||
    // booking.value.phone == "" ||
    // booking.value.phone == null ||
    // booking.value.email == "" ||
    // booking.value.email == null ||
    // booking.value.invoice_address == "" ||
    // booking.value.invoice_address == null ||
    // booking.value.tax_id == "" ||
    // booking.value.tax_id == null
  ) {
    text_summary_error.value = "โปรดระบุข้อมูลให้ครบถ้วน";
    checkSummary.value = false;
    return;
  }

  booking.value.equipment_method = booking.value.equipment_method.map((x) => {
    if (x.is_fixrate == true) {
      x.total_price = x.quantity * x.pricing;
    } else {
      let percent = 1;
      if (booking.value.member_status.id == 1) {
        percent = 0.3;
      } else if (booking.value.member_status.id == 2) {
        percent = 0.5;
      } else if (booking.value.member_status.id == 3) {
        percent = 0.6;
      } else if (booking.value.member_status.id == 4) {
        percent = 0.8;
      } else {
        percent = 1;
      }
      x.total_price = x.quantity * (x.pricing * percent);
    }

    booking.value.total_price =
      parseInt(booking.value.total_price) + parseInt(x.total_price);

    return x;
  });

  checkSummary.value = true;
};

const onConfirmSubmit = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, confirm it!",
  }).then((result) => {
    if (result.isConfirmed) {
        onSubmit();
    }
  });
};

const onSubmit = async () => {
  let data = {
    ...booking.value,
    equipment_id: item.value.id,
    user_id: 1,
    member_status: booking.value.member_status.id,
    period_time: booking.value.period_time.id,
    booking_date:
      booking.value.booking_date != ""
        ? dayjs(booking.value.booking_date).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
    price: booking.value.total_price,
  };

  await $fetch(`${runtimeConfig.public.apiBase}/booking`, {
    method: "post",
    body: data,
  })
    .then((res) => {
      if (res.msg == "success") {
        localStorage.setItem("added", 1);
        console.log("Book Success");
        // router.push({
        //   path: "/news/" + res.id,
        // });
      } else {
        console.log("error");
      }
    })
    .catch((error) => error.data);
};

useHead({
  title: item.value.title,
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}

.table-method tbody tr td {
  vertical-align: middle;
}

.hr-dotted {
  border-top: 1px dotted #aaa;
}
</style>
