import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { FC } from "react";
import invariant from "tiny-invariant";
import { createTodo } from "~/models/todo.server";

type ErrorsType = {
  title: string | null;
  deadline: string | null;
}

// todos.create.tsx
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const deadline = formData.get("deadline");

  const errors: ErrorsType = {
    title: title ? null : "タイトルは必須です",
    deadline: deadline ? null : "期限は必須です",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) return errors;

  invariant(typeof title === "string");
  invariant(typeof deadline === "string");

  await createTodo({ title, deadline });

  return redirect("/todos");
};

const CreateTodo: FC = () => {
  const errors = useActionData<typeof action>() as ErrorsType;
  return (
    <>
      <h2>新規追加画面</h2>
      <Form method="post">
        <div>
          <label>
            タイトル：
            {errors?.title ? (
              <p style={{ color: "red" }}>{errors.title}</p>
            ) : null}
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            期限：
            {errors?.deadline ? (
              <p style={{ color: "red" }}>{errors.deadline}</p>
            ) : null}
            <input type="date" name="deadline" />
          </label>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </Form>
    </>
  );
};

export default CreateTodo;