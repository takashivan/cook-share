import { JobsDetailData } from "@/api/__generated__/base/data-contracts";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobsDetailData["job"];
  onSubmit: (data: { notes: string }) => Promise<void>;
  isSubmitting?: boolean;
}

interface ApplyFormData {
  notes: string;
}

export const ApplyJobModal = ({
  isOpen,
  onClose,
  job,
  onSubmit,
  isSubmitting = false,
}: ApplyJobModalProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormData>();
  
  const [confirmations, setConfirmations] = useState({
    tasks: false,
    skills: false,
    notes: false,
    cancellation: false,
  });

  const onSubmitForm = (data: ApplyFormData) => {
    onSubmit(data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mb-4">
                  {job.title}に応募
                </Dialog.Title>

                <div className="space-y-6">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">業務内容</h4>
                    <div className="mt-2 text-sm text-gray-600">{job.task}</div>
                    <label className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={confirmations.tasks}
                        onChange={(e) =>
                          setConfirmations((prev) => ({
                            ...prev,
                            tasks: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        業務内容を確認しました
                      </span>
                    </label>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">
                      求めているスキル
                    </h4>
                    <div className="mt-2 text-sm text-gray-600">
                      {job.skill}
                    </div>
                    <label className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={confirmations.skills}
                        onChange={(e) =>
                          setConfirmations((prev) => ({
                            ...prev,
                            skills: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        記載されているスキルを確認しました
                      </span>
                    </label>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">注意事項</h4>
                    <div className="mt-2 text-sm text-gray-600">{job.note}</div>
                    <label className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={confirmations.notes}
                        onChange={(e) =>
                          setConfirmations((prev) => ({
                            ...prev,
                            notes: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        注意事項を確認しました
                      </span>
                    </label>
                  </div>

                  <div className="rounded-lg bg-red-50 p-4">
                    <h4 className="font-medium text-red-900">
                      キャンセルについて
                    </h4>
                    <div className="mt-2 space-y-2 text-sm text-red-800">
                      <p>お仕事のキャンセルは以下の条件で可能です：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>2日以上前のキャンセル：違約金なし</li>
                        <li>
                          1日前以降のキャンセル：報酬予定額の100%の違約金とキャンセル手数料が発生
                        </li>
                      </ul>
                      <p className="mt-2">
                        ※
                        度重なるキャンセルや不当な理由でのキャンセルは、今後のご利用停止となる可能性があります。
                      </p>
                    </div>
                    <label className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        checked={confirmations.cancellation}
                        onChange={(e) =>
                          setConfirmations((prev) => ({
                            ...prev,
                            cancellation: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-red-800">
                        キャンセル条件を確認しました
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      disabled={
                        !Object.values(confirmations).every(Boolean) ||
                        isSubmitting
                      }
                      className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit(onSubmitForm)}>
                      {isSubmitting ? "送信中..." : "応募する"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
