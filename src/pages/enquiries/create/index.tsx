import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createEnquiry } from 'apiSdk/enquiries';
import { enquiryValidationSchema } from 'validationSchema/enquiries';
import { BranchInterface } from 'interfaces/branch';
import { UserInterface } from 'interfaces/user';
import { getBranches } from 'apiSdk/branches';
import { getUsers } from 'apiSdk/users';
import { EnquiryInterface } from 'interfaces/enquiry';

function EnquiryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EnquiryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEnquiry(values);
      resetForm();
      router.push('/enquiries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EnquiryInterface>({
    initialValues: {
      source: '',
      branch_id: (router.query.branch_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: enquiryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Enquiries',
              link: '/enquiries',
            },
            {
              label: 'Create Enquiry',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Enquiry
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.source}
            label={'Source'}
            props={{
              name: 'source',
              placeholder: 'Source',
              value: formik.values?.source,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<BranchInterface>
            formik={formik}
            name={'branch_id'}
            label={'Select Branch'}
            placeholder={'Select Branch'}
            fetcher={getBranches}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/enquiries')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'enquiry',
    operation: AccessOperationEnum.CREATE,
  }),
)(EnquiryCreatePage);
