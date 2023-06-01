import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { userReducer } from './users/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import { menuReducer  } from './menu/reducers';
import { observationTypeReducer, observationTypeSingleReducer } from './sbo/observationtype/reducers';
import { siteReducer, siteSingleReducer } from './systemsetting/site/reducers';
import { departmentReducer, departmentSingleReducer } from './systemsetting/department/reducers';
import { shiftReducer,  shiftSingleReducer } from './systemsetting/shift/reducers';
import { designationReducer,  designationSingleReducer } from './systemsetting/designation/reducers';
import { positionReducer,  positionSingleReducer } from './systemsetting/position/reducers';
import { contractoragencyReducer,  contractoragencySingleReducer } from './systemsetting/contractoragency/reducers';
import { severitiesReducer,  severitiesSingleReducer } from './systemsetting/severities/reducers';
import { natureofworkReducer,  natureofworkSingleReducer } from './systemsetting/natureofwork/reducers';
import { tenantReducer,  tenantSingleReducer } from './systemsetting/tenant/reducers';
import { languageReducer, languageSingleReducer } from './systemsetting/language/reducers';
import { stringsourceReducer, stringsourceSingleReducer } from './systemsetting/stringsource/reducers';
import { menumasterReducer, menumasterSingleReducer } from './systemsetting/menumaster/reducers';
import { employeeReducer, employeeSingleReducer } from './systemsetting/employee/reducers';
import { facilityReducer,  facilitySingleReducer } from './facility/reducers';
import { facility1Reducer,  facility1SingleReducer } from './systemsetting/facility1/reducers';
import { facility2Reducer,  facility2SingleReducer } from './systemsetting/facility2/reducers';
import { facility3Reducer,  facility3SingleReducer } from './systemsetting/facility3/reducers';
import { facility4Reducer,  facility4SingleReducer } from './systemsetting/facility4/reducers';
import { facility5Reducer,  facility5SingleReducer } from './systemsetting/facility5/reducers';
import { facility6Reducer,  facility6SingleReducer } from './systemsetting/facility6/reducers';
import { categoryReducer, categorySingleReducer } from './sbo/category/reducers';
import { subcategoryReducer, subcategorySingleReducer } from './sbo/subcategory/reducers';
import { taskmanagementReducer, taskmanagementSingleReducer } from './taskmanagement/reducers';
import { contractoremployeeReducer, contractoremployeeSingleReducer } from './systemsetting/contractoremployee/reducers';
import chartContentReducer from './chartContent/reducers';
import {obsChartReducer,obsChartSingleReducer} from './systemsetting/observationchart/reducers';
import {SocategorychartReducer,SocategorychartSingleReducer} from './systemsetting/Socategorychart/reducers';
import {teamReducer,teamSingleReducer} from './team/reducers';
import {campaignReducer,campaignSingleReducer} from './campaign/reducers';
import {walletReducer,walletSingleReducer} from './wallet/reducers';
import {directreferalReducer,directreferalSingleReducer} from './directreferal/reducers';



const rootReducers = combineReducers({
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  users: userReducer,
  auth: authReducer,
  menu :menuReducer,
  ChangeLayoutMode,
  ObservationType: observationTypeReducer,
  SingleObservationType: observationTypeSingleReducer,
  site: siteReducer,
  SingleSite: siteSingleReducer,
  department: departmentReducer,
  SingleDepartment: departmentSingleReducer,
  shift: shiftReducer,
  SingleShift: shiftSingleReducer,
  designation: designationReducer,
  SingleDesignation: designationSingleReducer,
  position: positionReducer,
  SinglePosition: positionSingleReducer,
  contractoragency: contractoragencyReducer,
  SingleContractoragency: contractoragencySingleReducer,
  severities: severitiesReducer,
  SingleSeverities: severitiesSingleReducer,
  natureofwork: natureofworkReducer,
  SingleNatureofwork: natureofworkSingleReducer,
  tenant: tenantReducer,
  tenantSingle: tenantSingleReducer,
  language: languageReducer,
  languageSingle: languageSingleReducer,
  stringsource: stringsourceReducer,
  stringsourceSingle: stringsourceSingleReducer,
  menumaster: menumasterReducer,
  menumasterSingle: menumasterSingleReducer,
  facility: facilityReducer,
  SingleFacility: facilitySingleReducer,
  facility1: facility1Reducer,
  SingleFacility1: facility1SingleReducer,
  facility2: facility2Reducer,
  SingleFacility2: facility2SingleReducer,
  facility3: facility3Reducer,
  SingleFacility3: facility3SingleReducer,
  facility4: facility4Reducer,
  SingleFacility4: facility4SingleReducer,
  facility5: facility5Reducer,
  SingleFacility5: facility5SingleReducer,
  facility6: facility6Reducer,
  SingleFacility6: facility6SingleReducer,
  category: categoryReducer,
  categorySingle: categorySingleReducer,
  subcategory: subcategoryReducer,
  subcategorySingle: subcategorySingleReducer,
  employee: employeeReducer,
  employeeSingle: employeeSingleReducer,
  taskmanagement: taskmanagementReducer,
  taskmanagementSingle: taskmanagementSingleReducer,
  contractoremployee: contractoremployeeReducer,
  contractoragencySingle: contractoremployeeSingleReducer,
  chartContent: chartContentReducer,
  obsChart: obsChartReducer,
  obsChartSingle: obsChartSingleReducer,
  Socategorychart: SocategorychartReducer,
  SocategorychartSingle: SocategorychartSingleReducer,
  team: teamReducer,
  teamSingle: teamSingleReducer,
  campaign: campaignReducer,
  campaignSingle: campaignSingleReducer,
  wallet: walletReducer,
  walletSingle: walletSingleReducer,
  directreferal: directreferalReducer,
  directreferalSingle: directreferalSingleReducer
});

export default rootReducers;
