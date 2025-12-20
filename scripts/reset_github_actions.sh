cat << 'EOF' > scripts/reset_github_actions.sh
#!/usr/bin/env bash
set -euo pipefail

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

echo "Repo: $REPO"
echo "Fetching workflows..."

# Cancel all currently running workflows
echo "Cancelling running workflow jobs..."
gh run list --repo "$REPO" --status in_progress --json databaseId \
  | jq -r '.[].databaseId' \
  | while read -r run_id; do
      echo "Cancelling run $run_id"
      gh run cancel "$run_id" --repo "$REPO" || true
    done

# Delete ALL workflow run history
echo "Deleting workflow run history..."
gh api \
  -X GET "repos/$REPO/actions/runs?per_page=100" \
  --paginate \
  | jq -r '.workflow_runs[].id' \
  | while read -r run_id; do
      echo "Deleting run $run_id"
      gh api -X DELETE "repos/$REPO/actions/runs/$run_id" || true
    done

echo "GitHub Actions history cleared."
echo "NOTE: This does not modify code or workflows."
EOF
