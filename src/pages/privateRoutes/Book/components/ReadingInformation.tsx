import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQueryGetReadByBookId } from '../../../../app/hooks/queries/read/useQueryGetReadByBookId';

import { useMutateStartRead } from '../../../../app/hooks/mutations/useMutateStartReading';
import { useMutateUpdateCurrentPage } from '../../../../app/hooks/mutations/useMutateUpdateCurrentPage';

import { formatDate } from '../../../../utils/formatDate';
import { getDaysBetween } from '../../../../utils/getDaysBetween';
import { emitToast } from '../../../../utils/emitToast';

import { CiEdit } from 'react-icons/ci';
import { ClipLoader } from 'react-spinners';

import { IRead } from '../../../../@types/Read';

import SkeletonLoading from '../../../../components/SkeletonLoading';
import InformationButton from './InformationButton';
import ReadsService from '../../../../app/services/ReadsService';
import PauseOrPlayButton from './PauseOrPlayButton';
import FinishButton from './FinishButton';

import EditCurrentPageModal from '../../../../components/Modals/EditCurrentPageModal';
import FinishBookModal from '../../../../components/Modals/FinishBookModal';

interface ReadingInformationProps {
  bookTitle: string;
  numberOfPages: number;
}

export default function ReadingInformation({
  bookTitle,
  numberOfPages,
}: ReadingInformationProps) {
  const { id } = useParams();

  const { readData, isLoadingRead, isRefetchingRead } = useQueryGetReadByBookId(
    {
      bookId: id!,
    }
  );

  const { startRead, isStartingRead } = useMutateStartRead();
  const { updateCurrentPage, isUpdatingCurrentPage } =
    useMutateUpdateCurrentPage();

  const [read, setRead] = useState<IRead | null>(null);

  const [isEditReadModalVisible, setIsEditReadModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const isReading = read?.status === 'READING' || read?.status === 'ON_HOLD';
  const isFinished = read?.status === 'FINISHED';
  const isNotFinished = read && read.status !== 'FINISHED';

  const bookProgress = Number(
    read ? (read.currentPage / numberOfPages) * 100 : '0'
  ).toFixed(2);

  const totalDaysToFinish = getDaysBetween({
    startDate: read?.createdAt as string,
    endDate: read?.finishedAt as string,
  });

  const dateToBeDisplayed =
    read &&
    (read.status === 'FINISHED'
      ? formatDate(new Date(read.finishedAt!))
      : formatDate(new Date(read.createdAt)));

  async function handleStartReading() {
    const updatedRead = await startRead({ bookId: id! });

    setRead(updatedRead);
  }

  async function handleUpdateCurrentPage(page: number) {
    const updatedRead = await updateCurrentPage({ bookId: id!, page });

    setRead(updatedRead);

    setIsEditReadModalVisible(false);
  }

  async function handlePauseOrContinuationReading() {
    const status = read?.status;

    const statusDirection = status === 'READING' ? 'ON_HOLD' : 'READING';

    try {
      await ReadsService.updateRead({
        bookId: id!,
        status: statusDirection,
      });
    } catch {
      if (status === 'READING') {
        emitToast({
          type: 'error',
          message: `Não foi possível pausar a leitura do livro.`,
        });
      } else if (status === 'ON_HOLD') {
        emitToast({
          type: 'error',
          message: `Não foi possível continuar a leitura do livro.`,
        });
      }
    }
  }

  async function handleFinishReading() {
    try {
      await ReadsService.updateRead({
        bookId: id!,
        status: 'FINISHED',
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (readData) {
      setRead(readData);
    }
  }, [readData]);

  return (
    <>
      <EditCurrentPageModal
        currentPage={read?.currentPage ?? null}
        pagesTotalNumber={numberOfPages}
        isVisible={isEditReadModalVisible}
        isUpdating={isUpdatingCurrentPage}
        onClose={() => setIsEditReadModalVisible(false)}
        onConfirm={handleUpdateCurrentPage}
      />

      <FinishBookModal
        bookTitle={bookTitle}
        remainingPages={numberOfPages! - (read?.currentPage ?? 0)}
        isVisible={isConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        onConfirm={handleFinishReading}
      />

      <div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <InformationButton
            status={read?.status ?? null}
            onChangeBookStatus={handleStartReading}
            isLoadingRead={isLoadingRead}
            isUpdatingRead={isStartingRead}
          />

          {isReading && !isLoadingRead && (
            <>
              <PauseOrPlayButton
                status={read?.status ?? null}
                isRefetchingRead={isRefetchingRead}
                onClick={handlePauseOrContinuationReading}
              />

              <FinishButton
                isRefetchingRead={isRefetchingRead}
                onChangeBookStatus={() => setIsConfirmationModalVisible(true)}
              />
            </>
          )}
        </div>

        <div className="bg-navy-blue text-snow-white-op-70 font-quicksand relative mt-3 flex min-h-[54px] justify-between rounded-lg px-4 py-2 text-sm sm:mt-5">
          {isLoadingRead ? (
            <SkeletonLoading rounded="lg" />
          ) : (
            <div>
              <p className="flex gap-2">
                {read ? (
                  <>
                    <span>
                      Leitura {isNotFinished ? 'iniciada' : 'concluída'} em:
                    </span>
                    <span className="text-sky-blue font-semibold">
                      {dateToBeDisplayed}
                    </span>
                  </>
                ) : (
                  <span className="text-sky-blue font-semibold">
                    Leitura não iniciada
                  </span>
                )}
              </p>

              <p className="flex gap-2">
                <span>Total de páginas:</span>
                <span className="text-sky-blue font-semibold">
                  {numberOfPages}
                </span>
              </p>
              {isReading && (
                <>
                  <p className="flex gap-2">
                    Página atual:
                    <span className="text-sky-blue font-semibold">
                      {read?.currentPage}
                    </span>
                  </p>

                  <p className="flex gap-2">
                    Progresso:
                    <span className="text-sky-blue font-semibold">
                      {bookProgress}%
                    </span>
                  </p>
                </>
              )}

              {isFinished && (
                <p className="flex gap-2">
                  Terminado em:
                  <span className="text-sky-blue font-semibold">
                    {totalDaysToFinish} dias
                  </span>
                </p>
              )}
            </div>
          )}

          {!isLoadingRead && isNotFinished && (
            <>
              {isRefetchingRead ? (
                <ClipLoader color="#ffffff" size={14} />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditReadModalVisible(true)}
                  className="flex"
                >
                  <CiEdit
                    size={20}
                    className="text-sky-blue transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-60"
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
