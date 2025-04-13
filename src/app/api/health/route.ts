/* ALBのヘルスチェック用 */
export async function GET() {
    return new Response('OK', { status: 200 });
}
