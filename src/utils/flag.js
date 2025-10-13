import Rox from "rox-browser";
import { betaAccess, isLoggedIn, getCompany } from "./users";

export const configurationFetchedHandler = (fetcherResults) => {
  // console.log(fetcherResults)
  // if (fetcherResults.hasChanges && fetcherResults.fetcherStatus === 'APPLIED_FROM_NETWORK') {
  //   window.location.reload(false)
  // }
};

export const impressionHandler = (reporting) => {
  if (reporting.targeting) {
    // console.log('flag ' + reporting.name + ' value is ' + reporting.value)
  } else {
    // console.log('No experiment configured for flag ' + reporting.name + '. default value ' + reporting.value + ' was used')
  }
};

const options = {
  configurationFetchedHandler: configurationFetchedHandler,
  impressionHandler: impressionHandler,
};

// Add VPC-specific configuration if USE_VPC is enabled
if (window.APP_CONFIG.USE_VPC === 'true') {
  const instance = window.APP_CONFIG.FM_INSTANCE;
  options.disableSignatureVerification = true;
  options.selfManaged = {
    configurationURL: `https://api.${instance}/device/get_configuration`,
    serverURL: `https://rox-conf.${instance}`,
    stateURL: `https://api.${instance}/device/update_state_store/`,
    analyticsURL: `https://fm-analytics.${instance}`,
    pushUpdateURL: `https://sdk-notification-service.${instance}/sse`,
  };
}

export const Flags = {
  score: new Rox.Flag(false),
  ask: new Rox.Flag(false),
  show: new Rox.Flag(false),
  headerColor: new Rox.RoxString("is-dark", [
    "is-dark",
    "is-primary",
    "is-white",
  ]),
};

Rox.setCustomBooleanProperty("isBetaUser", betaAccess());
Rox.setCustomBooleanProperty("isLoggedIn", isLoggedIn());
Rox.setCustomStringProperty("company", getCompany());

Rox.register("default", Flags);
Rox.setup(window.APP_CONFIG.FM_KEY, options);
