import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import Button from "./Button";

const FormComponent = ({
  fieldConfigs,
  btnConfig,
  apiEndpoint,
  forgotPassword,
  heading,
  initialValues = {},
  isModalOpen,
}) => {
  // Dynamically build validation schema from fieldConfigs
  const validationSchema = Yup.object(
    fieldConfigs.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  // Prepare initial form data
  const initialFormData = fieldConfigs.reduce((acc, field) => {
    acc[field.name] = initialValues[field.name] || field.defaultValue || "";
    return acc;
  }, {});

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (typeof apiEndpoint !== "function") {
      console.error("Invalid API endpoint");
      setSubmitting(false);
      return;
    }

    try {
      await apiEndpoint(values); // Call the API with form data
      resetForm(); // Reset form on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error(errorMessage);
    } finally {
      setSubmitting(false);
      isModalOpen(false);
    }
  };

  return (
    <div className="w-full">
      {heading && <h2 className="font-bold text-xl">{heading}</h2>}
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        enableReinitialize={true} // Allows form to update when initialValues change
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="space-y-4 mt-4">
            {fieldConfigs.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                touched={touched[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                forgotPassword={forgotPassword}
              />
            ))}
            {forgotPassword && (
              <a href="#" className="text-sm text-blue float-right mt-2">
                Forgot Password
              </a>
            )}
            <div className="mt-2">
              <Button
                config={{
                  ...btnConfig,
                  onClick: () => btnConfig.onClick(values),
                }}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
