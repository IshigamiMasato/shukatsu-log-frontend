import ActionContainer from "@/components/containers/ActionContainer";
import TitleContainer from "@/components/containers/TitleContainer";
import { APPLY_STATUS, DOCUMENT_SELECTION, EXAM_SELECTION, FINAL_RESULT, INTERVIEW_SELECTION, OFFER } from "@/constants/const";
import { getApplies } from "@/features/apply/api/getApplies";
import { getApplyStatusSummary } from "@/features/apply/api/getApplyStatusSummary";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { getEvents } from "@/features/event/api/getEvents";
import { Apply } from "@/types";
import { faCheck, faCirclePlus, faClockRotateLeft, faEnvelope, faFileLines, faFilePen, faHeart, faPenToSquare, faPeopleArrows, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";

const getApplyLink = (status: number) => {
	const query = new URLSearchParams({ 'status[]': String(status) }).toString();
	return `/apply?${query}`;
}

const Home = async () => {
	const applyStatusSummary = await getApplyStatusSummary();
	// トークンリフレッシュが必要な場合
	if ( applyStatusSummary === null ) return;
	const totalApply = Object.values(applyStatusSummary).reduce((sum, num) => sum + Number(num), 0);

	const startAt = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
	const endAt   = moment().add(1, 'week').endOf('day').format('YYYY-MM-DD HH:mm:ss');
	const events = await getEvents(new URLSearchParams({ start_at: startAt, end_at: endAt }));
	// トークンリフレッシュが必要な場合
	if ( events === null ) return;

	// 選考中の応募を取得
	const applyParams = new URLSearchParams();
	[ DOCUMENT_SELECTION, EXAM_SELECTION, INTERVIEW_SELECTION ].forEach(status => {
		applyParams.append('status[]', String(status));
	});
	const applies = await getApplies(applyParams);
	// トークンリフレッシュが必要な場合
	if ( applies === null ) return;

  	return (
	    <div className="container mx-auto px-8 py-6 rounded-lg">
			<div className="flex justify-start flex-wrap mb-4">
				<ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white m-1">
					<Link href='/event/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">予定登録</span>
					</Link>
				</ActionContainer>

				<ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white m-1">
					<Link href='/company/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">企業登録</span>
					</Link>
				</ActionContainer>

				<ActionContainer className="bg-blue-500 hover:bg-blue-600 text-white m-1">
					<Link href='/apply/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">応募登録</span>
					</Link>
				</ActionContainer>
			</div>

			<div className="mb-12">
				<TitleContainer main="進捗状況" />
					<div className="flex flex-wrap justify-between">
						<Link href={'/apply'} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faEnvelope} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">総応募数</h3>
									<span className="text-3xl font-bold">{ totalApply }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(DOCUMENT_SELECTION)} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faFileLines} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">書類選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.document_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(EXAM_SELECTION)} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faFilePen} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">筆記試験選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.exam_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(INTERVIEW_SELECTION)} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faPeopleArrows} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">面接選考中</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.interview_selection_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(OFFER)} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-red-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faHeart} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">内定</h3>
									<span className="text-3xl font-bold text-red-500">{ applyStatusSummary.offer_summary }</span>
								</div>
							</div>
						</Link>

						<Link href={getApplyLink(FINAL_RESULT)} className="basis-1/2 md:basis-1/3 bg-white p-4 hover:bg-gray-50 border border-gray-100 rounded-md">
							<div className="flex items-center space-x-4">
								<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
									<FontAwesomeIcon icon={faCheck} />
								</div>
								<div>
									<h3 className="text-base md:text-lg">選考終了</h3>
									<span className="text-3xl font-bold">{ applyStatusSummary.final_summary }</span>
								</div>
							</div>
						</Link>
					</div>
			</div>

			<div className="mb-12">
				<TitleContainer main="直近の予定" sub="一週間以内の予定を表示" />
				<div className="rounded-lg p-5 bg-white">
					<div className="bg-gray-100 rounded-lg p-8">
						{ events.length > 0
							? (
								<ul>
									{events.map(event => {
										return (
											<li key={event.event_id} className="flex justify-between items-center list-disc border-b pb-2 text-sm">
												<span>{event.title}</span>
												<span className="text-gray-500">{ moment(event.start_at).format('YYYY年MM月DD日 HH時mm分') }〜</span>
											</li>
										)
									})}
								</ul>
							)
							: <p className="text-sm">予定はありません。</p>
						}
					</div>
				</div>
			</div>

			<div className="">
				<TitleContainer main="選考中の応募" />
				<div className="rounded-lg p-5 bg-white">
					<div className="overflow-x-auto shadow-md rounded-lg border">
						<table className="w-full text-sm text-left">
							<thead className="text-xs bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
									<th scope="col" className="px-6 py-3 text-nowrap">企業名</th>
									<th scope="col" className="px-6 py-3 text-nowrap">職種</th>
									<th scope="col" className="px-6 py-3 text-nowrap">登録日時</th>
									<th scope="col" className="px-6 py-3 text-nowrap">更新日時</th>
									<th scope="col" className="px-6 py-3 text-nowrap">選考履歴</th>
									<th scope="col" className="px-6 py-3 text-nowrap">編集</th>
									<th scope="col" className="px-6 py-3 text-nowrap">削除</th>
								</tr>
							</thead>
							<tbody>
								{applies.map((apply: Apply) => {
									return (
										<tr key={ apply.apply_id } className="bg-white border-b border-gray-200 hover:bg-gray-50">
											<td className="px-6 py-3 font-medium whitespace-nowrap">
												<Link href={`/apply/${apply.apply_id}`} className="border p-1 rounded-lg text-blue-500 hover:bg-blue-100 transition-all duration-300">{ APPLY_STATUS.find(status => status.id == apply.status)?.name }</Link>
											</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">
												<Link href={`/company/${apply.company_id}`} className="text-blue-500 hover:underline">{ apply.company.name }</Link>
											</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.occupation }</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.created_at }</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.updated_at }</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">
												<ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
													<Link href={`/apply/${apply.apply_id}/process`}>
														<FontAwesomeIcon icon={faClockRotateLeft} />
													</Link>
												</ActionContainer>
											</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">
												<ActionContainer className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300">
													<Link href={`/apply/${apply.apply_id}/edit`}>
														<FontAwesomeIcon icon={faPenToSquare} />
													</Link>
												</ActionContainer>
											</td>
											<td className="px-6 py-3 font-medium whitespace-nowrap">
												<ActionContainer className="bg-red-600 hover:bg-red-700 text-white">
													<ApplyDeleteButton applyId={apply.apply_id}>
														<FontAwesomeIcon icon={faTrash} />
													</ApplyDeleteButton>
												</ActionContainer>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;
