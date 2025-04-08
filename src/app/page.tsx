import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { DOCUMENT_SELECTION, EVENT_TYPES, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER, UNREGISTERED_SELECTION_PROCESS } from "@/constants/const";
import { getApplies } from "@/features/apply/api/getApplies";
import { getApplyStatusSummary } from "@/features/apply/api/getApplyStatusSummary";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import DocumentSelectionStatusBadge from "@/features/apply/components/DocumentSelectionStatusBadge";
import ExamSelectionStatusBadge from "@/features/apply/components/ExamSelectionStatusBadge";
import FinalResultStatusBadge from "@/features/apply/components/FinalResultStatusBadge";
import UnregisteredSelectionProcessStatusBadge from "@/features/apply/components/UnregisteredSelectionProcessStatusBadge";
import InterviewSelectionStatusBadge from "@/features/apply/components/InterviewSelectionStatusBadge";
import OfferStatusBadge from "@/features/apply/components/OfferStatusBadge";
import { getEvents } from "@/features/event/api/getEvents";
import { Apply } from "@/types";
import { faBuilding, faCheck, faChevronRight, faClockRotateLeft, faFileLines, faFilePen, faHeart, faPenToSquare, faPeopleArrows, faQuestion, faTrash, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import Button from "@/components/elements/Button";
import getBadge from "@/features/apply/getBadge";
import { getCompanies } from "@/features/company/api/getCompanies";
import verifyAuth from "@/server/utils/verifyAuth";
import ApplyIndexForSP from "@/features/apply/components/ApplyIndexForSP";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
}

const getApplyLink = (status: number) => {
	const query = new URLSearchParams({ 'status[]': String(status) }).toString();
	return `/apply?${query}`;
}

const Home = async () => {
	await verifyAuth();

	const applyStatusSummary = await getApplyStatusSummary();
	const totalApply = Object.values(applyStatusSummary).reduce((sum, num) => sum + Number(num), 0);

	const startAt = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
	const endAt   = moment().add(1, 'week').endOf('day').format('YYYY-MM-DD HH:mm:ss');
	const events = await getEvents(new URLSearchParams({ start_at: startAt, end_at: endAt }));

	// 選考中の応募を取得
	const applyParams = new URLSearchParams();
	[ DOCUMENT_SELECTION, EXAM_SELECTION, INTERVIEW_SELECTION ].forEach(status => {
		applyParams.append('status[]', String(status));
	});
	const resultGetApplies = await getApplies(applyParams);
    const applies = resultGetApplies.data;
    const progressTotal = resultGetApplies.total;

	const resultGetCompanies = await getCompanies(new URLSearchParams());
	const companiesTotal = resultGetCompanies.total;

  	return (
	    <div className="container mx-auto px-8 py-6 rounded-lg">
			{ companiesTotal === 0 && (
				<div className="flex flex-wrap justify-between items-center mb-4 p-8 bg-blue-100 rounded-lg">
					<div className="flex space-x-2">
						<div className="text-white bg-blue-500 w-6 h-6 text-center align-middle rounded-full hidden md:block">
							<FontAwesomeIcon icon={faVolumeHigh} />
						</div>
						<h3 className="text-base font-medium">企業がまだ登録されていません。応募予定の企業を登録して下さい。</h3>
					</div>
					<div className="my-1">
						<Link href='/company/create'>
							<Button className="bg-blue-500 hover:bg-blue-600 text-white">企業を登録する</Button>
						</Link>
					</div>
				</div>
			)}

			{ companiesTotal >= 1 && totalApply === 0 && (
				<div className="flex flex-wrap justify-between items-center mb-4 p-8 bg-blue-100 rounded-lg">
					<div className="flex space-x-2">
						<div className="text-white bg-blue-500 w-6 h-6 text-center align-middle rounded-full hidden md:block">
							<FontAwesomeIcon icon={faVolumeHigh} />
						</div>
						<h3 className="text-base font-medium">応募情報がまだ登録されていません。応募情報を登録して下さい。</h3>
					</div>
					<div className="my-1">
						<Link href='/apply/create'>
							<Button className="bg-blue-500 hover:bg-blue-600 text-white">応募情報を登録する</Button>
						</Link>
					</div>
				</div>
			)}

			{ Number(applyStatusSummary.unregistered_selection_process_summary) > 0 && (
				<div className="flex flex-wrap justify-between items-center mb-4 p-8 bg-red-100 rounded-lg">
					<div className="flex space-x-2">
						<div className="text-white bg-red-500 w-6 h-6 text-center align-middle rounded-full hidden md:block">
							<FontAwesomeIcon icon={faVolumeHigh} />
						</div>
						<h3 className="text-base font-medium">選考履歴が登録されていない応募があります。</h3>
					</div>
					<div>
						<Link href={getApplyLink(UNREGISTERED_SELECTION_PROCESS)}>
							<Button className="bg-red-600 hover:bg-red-700 text-white">選考履歴を登録する</Button>
						</Link>
					</div>
				</div>
			)}

			<div className="mb-12">
				<TitleContainer main="直近の予定" sub="一週間以内の予定を表示" />
				<div className="rounded-lg p-8 bg-white">
					{ events.length > 0
						? (
							<ul>
								{events.map(event => {
									return (
										<Link key={event.event_id} href='/event' className="hover:underline">
											<li className="border-b pb-2 mb-2">
												<div>
													<h3 className="text-base font-medium">{event.title}</h3>
													<p className="text-sm text-gray-500">{EVENT_TYPES.find(status => status.id == event.type)?.name}</p>
													<p className="text-sm">{moment(event.start_at).format('YY年MM月DD日 HH時mm分')} 〜 {moment(event.end_at).format('YY年MM月DD日 HH時mm分')}</p>
												</div>
											</li>
										</Link>
									)
								})}
							</ul>
						)
						: (
							<div>
								<h3 className="text-base font-medium mb-2">直近の予定はありません。</h3>
								<div className="flex text-sm items-center text-blue-500 hover:underline">
									<Link href='/event/create' className="mr-1">予定を登録する</Link>
									<FontAwesomeIcon icon={faChevronRight} />
								</div>
							</div>
						)
					}
				</div>
			</div>

			<div className="mb-12">
				<TitleContainer main="進捗状況" sub={`総応募数：${totalApply}`} />
					<div className="flex flex-wrap justify-between">
						<Link href={getApplyLink(UNREGISTERED_SELECTION_PROCESS)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-black bg-white p-3 rounded-full w-10 h-10 md:w-12 md:h-12 border">
									<FontAwesomeIcon icon={faQuestion} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">選考履歴未登録</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.unregistered_selection_process_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(DOCUMENT_SELECTION)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-blue-800 bg-blue-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faFileLines} />
								</div>
								<div>
									<h3 className="text-base md:text-lg text-blue-800">書類選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.document_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(EXAM_SELECTION)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-indigo-800 bg-indigo-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faFilePen} />
								</div>
								<div>
									<h3 className="text-base md:text-lg text-indigo-800">筆記試験選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.exam_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(INTERVIEW_SELECTION)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-green-800 bg-green-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faPeopleArrows} />
								</div>
								<div>
									<h3 className="text-base md:text-lg text-green-800">面接選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.interview_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(OFFER)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-red-500 bg-red-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faHeart} />
								</div>
								<div>
									<h3 className="text-base md:text-lg text-red-500">内定</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.offer_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(FINAL_RESULT)} className="w-full sm:basis-1/2 md:basis-1/3 bg-white p-4 px-8 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-800 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faCheck} />
								</div>
								<div>
									<h3 className="text-base md:text-lg text-gray-800">選考終了</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.final_summary }</span>
								</div>
							</div>
						</Link>
					</div>
			</div>

			<div className="">
				<TitleContainer main="選考中の応募" />
				<div className="rounded-lg p-8 bg-white">
					<div className="flex items-center justify-between overflow-x-auto mb-3 space-x-2">
						<div className="text-gray-500 text-nowrap">
							選考中件数：<span className="font-semibold text-black">{ progressTotal }</span>件
						</div>
						<div className="flex items-center text-xs font-medium text-nowrap">
							<p>ステータス：</p>
							<UnregisteredSelectionProcessStatusBadge />
							<DocumentSelectionStatusBadge />
							<ExamSelectionStatusBadge />
							<InterviewSelectionStatusBadge />
							<OfferStatusBadge />
							<FinalResultStatusBadge />
						</div>
					</div>

					{ applies.length > 0
						? (
							<>
								{/* PC用 */}
								<div className="overflow-x-auto shadow-md rounded-lg border sm:block hidden">
									<table className="w-full text-sm text-left">
										<thead className="text-xs bg-gray-100">
											<tr>
												<th scope="col" className="px-6 py-3 text-nowrap">企業名 / 職種</th>
												<th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
												<th scope="col" className="px-6 py-3 text-nowrap">選考履歴</th>
												<th scope="col" className="px-6 py-3 text-nowrap">企業詳細</th>
												<th scope="col" className="px-6 py-3 text-nowrap">編集</th>
												<th scope="col" className="px-6 py-3 text-nowrap">削除</th>
												<th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
												<th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
											</tr>
										</thead>
										<tbody>
											{applies.map((apply: Apply) => {
												return (
													<tr key={ apply.apply_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															<Link href={`/apply/${apply.apply_id}`} className="text-blue-500 hover:underline">
																{ apply.company.name } / { apply.occupation }
															</Link>
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															{ getBadge(apply.status) }
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															<Link href={`/apply/${apply.apply_id}/process`}>
																<ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
																	<FontAwesomeIcon icon={faClockRotateLeft} />
																</ActionContainer>
															</Link>
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															<Link href={`/company/${apply.company_id}`}>
																<ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
																	<FontAwesomeIcon icon={faBuilding} />
																</ActionContainer>
															</Link>
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															<Link href={`/apply/${apply.apply_id}/edit`}>
																<ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
																	<FontAwesomeIcon icon={faPenToSquare} />
																</ActionContainer>
															</Link>
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">
															<ApplyDeleteButton applyId={apply.apply_id}>
																<ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
																	<FontAwesomeIcon icon={faTrash} />
																</ActionContainer>
															</ApplyDeleteButton>
														</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.created_at }</td>
														<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.updated_at }</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>

								{/* SP用 */}
								<ApplyIndexForSP applies={applies} />
							</>
						)
						: (
							<h3 className="text-base font-medium mb-2">選考中の応募が存在しません。</h3>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Home;
