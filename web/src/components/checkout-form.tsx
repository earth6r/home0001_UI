import React, { useState, useEffect } from "react";
//stripe
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import GridRow from "./grid/grid-row";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/core";

//calendly
import { InlineWidget } from "react-calendly";
import PortableText from "./portableText";

const CARD_OPTIONS = {
  iconStyle: "solid",

  style: {
    base: {
      iconColor: "#000000",
      color: "#000",
      fontWeight: 400,
      fontFamily: "'GP', Helvetica, Arial, serif",
      fontSize: "1rem",
      letterSpacing: "-0.02em",
      // boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.3) !important",
      height: "2em",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#000000",
      },
      "::placeholder": {
        color: "rgba(0, 0, 0, .4)",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const Field = ({ label, id, type, placeholder, required, autoComplete, value, onChange }) => (
  <FormControl className="pb-1em flex flex-col">
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      type={type}
      id={id}
      className="box h-0 pt-1em pb-3/4em h-2em px-1/2em"
      aria-describedby={`enter ${label}`}
    />
  </FormControl>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <FormControl className="md:ml-1/10">
    <Button
      className={`SubmitButton box bg-black hover:bg-black ${error ? "SubmitButton--error" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? "Processing..." : children}
    </Button>
  </FormControl>
);

const ErrorMessage = ({ children }) => (
  <div
    className="ErrorMessage md:ml-1/10 border rounded-lg text-center pt-1/2em pb-1/4em"
    style={{ borderColor: "red", color: "red" }}
    role="alert"
  >
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = ({ terms }) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  // const [error, setError] = useState(null);
  // const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  // const stripe = useStripe();
  // const elements = useElements();

  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        type: "default",
        // One of 'default', 'book', 'buy', or 'donate'
        // Defaults to 'default'

        theme: "dark",
        // One of 'dark', 'light', or 'light-outline'
        // Defaults to 'dark'

        height: "60px",
        // Defaults to '40px'. The width is always '100%'.
      },
    },
  };

  const elements = useElements({
    fonts: [
      {
        family: "GP",
        src: "url(https://earth6r.com/fonts/GerstnerProgramm-Regular.woff2)",
        weight: "400",
      },
    ],
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "prod_I60qjmmPa4mkzc" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });

    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Membership",
          amount: 300,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we generated a PaymentMethod:{" "}
        {paymentMethod.id}
        <GridRow>
          <InlineWidget
            pageSettings={{
              backgroundColor: "ffffff",
              hideEventTypeDetails: true,
              hideLandingPageDetails: true,
              primaryColor: "000000",
              textColor: "000000",
              font: "GP",
              fontWeight: "normal",
            }}
            prefill={{
              customAnswers: {
                a1: "",
                a10: "a10",
                a2: "a2",
                a3: "a3",
                a4: "a4",
                a5: "a5",
                a6: "a6",
                a7: "a7",
                a8: "a8",
                a9: "a9",
              },
              email: "test@test.com",
              firstName: "Jon",
              lastName: "Snow",
              name: "Jon Snow",
            }}
            styles={{
              height: "1000px",
              color: "#000000",
              textColor: "#000000",
              primaryColor: "#000000",
            }}
            url="https://calendly.com/earthcollective?text_color=000000&primary_color=000000"
            utm={{
              utmCampaign: "Signup",
              utmContent: "Shoe and Shirts",
              utmMedium: "Ad",
              utmSource: "Facebook",
              utmTerm: "Spring",
            }}
          />
        </GridRow>
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form " onSubmit={handleSubmit}>
      {paymentRequest && (
        <div className="md:ml-1/10 mb-2em">
          <PaymentRequestButtonElement options={options} />
        </div>
      )}

      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="First Last"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="email@address.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup mb-1em">
        <FormControl className="">
          <label className="text-nav md:text-desktopNav pb-1em text-left">Payment Details</label>
          <div
            style={{ paddingTop: ".45em" }}
            className="px-1/2em h-2em box rounded-md md:ml-1/10 "
          >
            <CardElement id="card-element" options={CARD_OPTIONS} onChange={handleChange} />
          </div>
        </FormControl>
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <div className="mt-2em">
        <SubmitButton processing={processing} error={error} disabled={!stripe}>
          <span className="md:mt-0 block leading-none md:inline">Join Now</span>
        </SubmitButton>
      </div>

      {terms && (
        <fieldset className="FormGroup pt-2em md:-ml-4">
          <Checkbox required={true} aria-required={true} isInvalid name="gdpr">
            <div className="md:mt-1">
              <PortableText blocks={terms} />
            </div>
          </Checkbox>
        </fieldset>
      )}

      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>Payment succeeded.</p>
    </form>
  );
};

export default CheckoutForm;
