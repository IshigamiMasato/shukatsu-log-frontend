import ActionContainer from "@/components/containers/ActionContainer";
import { APPLY_STATUS } from "@/constants/const";
import ApplyDeleteButton from "@/features/apply/components/ApplyDeleteButton";
import { Apply } from "@/types";
import { faCheck, faCirclePlus, faClockRotateLeft, faEnvelope, faFileLines, faFilePen, faHeart, faPenToSquare, faPeopleArrows, faTrash, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Home = () => {
	const applies = [
		{
			apply_id: 1,
			user_id: 1,
			company_id: 1,
			status: 1,
			occupation: "職種",
			apply_route: "応募経路",
			memo: "メモ",
			created_at: "2025-01-01 10:00:00",
			updated_at: "2025-01-01 10:00:00",
			company: {
				company_id: 1,
				user_id: 1,
				name: "企業A",
				url: "http://localhost:80",
				president: null,
				address: null,
				establish_date: null,
				employee_number: null,
				listing_class: null,
				benefit: null,
				memo: null,
				created_at: "2025-01-01 10:00:00",
				updated_at: "2025-01-01 10:00:00",
			}
		},
		{
			apply_id: 2,
			user_id: 1,
			company_id: 1,
			status: 1,
			occupation: "職種",
			apply_route: "応募経路",
			memo: "メモ",
			created_at: "2025-01-01 10:00:00",
			updated_at: "2025-01-01 10:00:00",
			company: {
				company_id: 1,
				user_id: 1,
				name: "企業A",
				url: "http://localhost:80",
				president: null,
				address: null,
				establish_date: null,
				employee_number: null,
				listing_class: null,
				benefit: null,
				memo: null,
				created_at: "2025-01-01 10:00:00",
				updated_at: "2025-01-01 10:00:00",
			}
		}
	];

  	return (
	    <div className="container mx-auto px-8 py-6 bg-white rounded-lg space-y-4">

			<div className="flex justify-start space-x-1 flex-wrap">
				<ActionContainer>
					<Link href='/event/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">予定登録</span>
					</Link>
				</ActionContainer>

				<ActionContainer>
					<Link href='/company/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">企業登録</span>
					</Link>
				</ActionContainer>

				<ActionContainer>
					<Link href='/apply/create'>
						<FontAwesomeIcon icon={faCirclePlus}/><span className="ml-1">応募登録</span>
					</Link>
				</ActionContainer>
			</div>

			<div className="flex flex-wrap justify-between border border-b-gray-200 shadow-md rounded-lg">
				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faEnvelope} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">応募数</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>

				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faFileLines} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">書類選考中</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>

				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faFilePen} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">筆記試験選考中</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>

				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faPeopleArrows} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">面接選考中</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>

				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-red-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faHeart} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">内定</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>

				<div className="basis-1/2 md:basis-1/3 flex items-center space-x-4 p-4">
					<div className="flex items-center justify-center text-gray-400 bg-gray-100 p-3 rounded-full w-10 h-10 md:w-12 md:h-12">
						<FontAwesomeIcon icon={faCheck} />
					</div>
					<div>
						<h3 className="text-gray-400 text-base md:text-lg">選考終了</h3>
						<span className="text-3xl font-bold">10</span>
					</div>
				</div>
			</div>

			<div className="border border-b-gray-200 shadow-md rounded-lg p-5">
				<div className="space-y-1 mb-3">
					<h2 className="text-xl font-bold">直近の予定</h2>
					<p className="text-gray-400 text-sm">一週間以内の予定を表示</p>
				</div>
				<div className="bg-gray-100 rounded-lg p-5">
					<ul>
						<li>・2025/01/01 A企業 面接</li>
						<li>・2025/01/01 A企業 面接</li>
						<li>・2025/01/01 A企業 面接</li>
						<li>・2025/01/01 A企業 面接</li>
						<li>・2025/01/01 A企業 面接</li>
					</ul>
				</div>
			</div>

			<div className="border border-b-gray-200 shadow-md rounded-lg p-5">
				<div className="flex items-center space-x-1 mb-3">
					<h2 className="text-xl font-bold">選考中</h2>
				</div>

				<div className="overflow-x-auto shadow-md rounded-lg border">
					<table className="w-full text-sm text-left">
						<thead className="text-xs bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3 text-nowrap">ステータス</th>
								<th scope="col" className="px-6 py-3 text-nowrap">企業名</th>
								<th scope="col" className="px-6 py-3 text-nowrap">職種</th>
								<th scope="col" className="px-6 py-3 text-nowrap">応募経路</th>
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
										<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.apply_route }</td>
										<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.created_at }</td>
										<td className="px-6 py-3 font-medium whitespace-nowrap">{ apply.updated_at }</td>
										<td className="px-6 py-3 font-medium whitespace-nowrap">
											<ActionContainer>
												<Link href={`/apply/${apply.apply_id}/process`}>
													<FontAwesomeIcon icon={faClockRotateLeft} />
												</Link>
											</ActionContainer>
										</td>
										<td className="px-6 py-3 font-medium whitespace-nowrap">
											<ActionContainer>
												<Link href={`/apply/${apply.apply_id}/edit`}>
													<FontAwesomeIcon icon={faPenToSquare} />
												</Link>
											</ActionContainer>
										</td>
										<td className="px-6 py-3 font-medium whitespace-nowrap">
											<ActionContainer>
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
	)
}

export default Home;
