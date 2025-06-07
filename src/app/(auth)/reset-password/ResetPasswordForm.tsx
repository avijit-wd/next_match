"use client";

import { resetPassword } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/schemas/resetPasswordSchema";
import { ActionResult } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FieldValues) => {
    setResult(await resetPassword(data.password, searchParams.get("token")));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Forgot Password"
      subHeaderText="Enter your new password below"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="password"
            placeholder="Password"
            variant="bordered"
            defaultValue=""
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
            {...register("password")}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            variant="bordered"
            defaultValue=""
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Reset password
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
}
